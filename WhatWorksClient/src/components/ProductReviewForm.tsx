import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { TextInput, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    const [image, setImage] = React.useState(null as string | null);

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
    const getImageUrl = async function (randomReviewID: number) {
        const url = await getDownloadURL(storageRef(storage, randomReviewID.toString()));
        console.log(url); 
        setImage(url);
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
        <SafeAreaView style={styles.background}>
            <ScrollView>
            <Text style={styles.heading2}> 
                Title
            </Text>
            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                style={styles.input}
                activeUnderlineColor="#42b0f5"
                placeholder="Burger"
                maxLength={30}
            />
            
            <Button 
                icon="camera"
                onPress={pickImage} 
                color="#42b0f5"
            >
                Select image
            </Button>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.heading2}>
                Review
            </Text>
            <TextInput 
                multiline={true}
                style={styles.input}
                activeUnderlineColor="#42b0f5"
                onChangeText={onChangeReview}
                value={review}
                placeholder="I loved this burger..."
                maxLength={1000}
            />
            <Button
                onPress={onPressPostReview}
                color="#007cba"
                accessibilityLabel="Post your review"
            >
                Post review!
                </Button>
            </ScrollView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    input: {
      backgroundColor :'#bfeaff',
      marginBottom:30
       },
    background: {
        backgroundColor:'#bfeaff', 
        flex: 1, 
        height: "100%"

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
        fontSize: 20, 
        padding:8,
        fontFamily:"Helvetica",
        marginLeft: 5, 
        fontWeight: "bold", 
        color: "#42b0f5"
    }
   
  });
  