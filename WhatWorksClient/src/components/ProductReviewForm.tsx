import * as React from 'react';
import { StyleSheet, Text, Image, Button, SafeAreaView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

// Firebase 
import { database, storage } from '../firebase';
import { ref, set } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as storageRef} from "firebase/storage"; 

// Firebase DB
const db = database;
// Firebase storage
const store = storage; 

interface ProductPostProperties { 
    navigation: any;
}

export default function UserProductReviewPage(props: ProductPostProperties) {
    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);
    const [image, setImage] = React.useState(null);

    const imageArray = 
    [
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Food_16.jpg",
        "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg", 
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Christmas_food_001.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Homemade_food_4.jpg"
    ];

    const userArray = 
    [
        "Jane Doe",
        "Jack Jackson", 
        "Mary Merryweather",
        "Joey Seagull",
        "xxX_Kool_Kid_Xxx",
        "flareUp2837",
        "Anon_User"
    ];
    
    // Randomly choose an image arrray from the above
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);
    
        if (!result.cancelled) {
            const { uri } = result as ImageInfo; 
            setImage(uri);
        }
    };

    async function writeReviewData (randomReviewID:number) {
        let randomNumUser = randomIntFromInterval(0,6);
        //let randomNumImage = randomIntFromInterval(0,3);

        // Write the review index
        set(ref(db, 'userReviewIndex/' + randomReviewID), {
            userReviewID: `${randomReviewID}`,
            title: `${title}`
        });

        // Write the core review
        set(ref(db, 'userCreatedReviews/' + randomReviewID), {
            username: `${userArray[randomNumUser]}`,
            title: `${title}`,
            imageURL: image ? image : null,
            review: `${review}`
        });

    }
    
    
    // upload image 
    async function uploadImageToStorage (randomReviewID: number) {
        if (image) { 
            const imageRef = storageRef(storage, randomReviewID.toString());
            const blob = await new Promise<Blob>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null);
                console.log("here");
            });
                
            uploadBytes(imageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                
            }); 
        }        
    }

    // get image url 
    async function getImageUrl(randomReviewID: number) {
        const url = await getDownloadURL(storageRef(storage, randomReviewID.toString()));
        setImage(prev => (url));
    }

    

    // Submission
    const onPressPostReview = async () => { 
        let randomReviewID = randomIntFromInterval(0,1000);
        // write image to firebase storage 
        await uploadImageToStorage(randomReviewID);
        await getImageUrl(randomReviewID);
        await writeReviewData(randomReviewID);
        props.navigation.navigate('MainScreen');
    } 
    
    return (
        <SafeAreaView>
            <Text style={styles.heading}>
                Post a review: 
            </Text>
            <Text style={styles.heading2}> 
                Title: 
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Burger"
                maxLength={30}
            />
            <Text style={styles.heading2}>
                Image:
            </Text>
            <Button 
                title="Pick an image from camera roll" 
                onPress={pickImage} 
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.heading2}>
                Review:
            </Text>
            <TextInput 
                multiline={true}
                style={styles.input}
                onChangeText={onChangeReview}
                value={review}
                placeholder="I loved this burger..."
                maxLength={1000}
            />
            <Button
                onPress={onPressPostReview}
                title="Post review"
                color="#841584"
                accessibilityLabel="Post your review"
            />
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    image: { 
        height: 200, 
        width: 200, 
        padding: 10, 
        left: 50
    }, 
    heading: {
        fontSize: 30,
        marginLeft: 5,
        fontWeight: "bold",
        color: "black",
        paddingBottom: 5, 
        paddingTop: 5,
    },
    heading2: { 
        fontSize: 18, 
        marginLeft: 5, 
        fontWeight: "bold", 
        color: "#42b0f5"
    }
   
  });
  