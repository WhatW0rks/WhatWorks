import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import { TextInput, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

// Firebase 
import { database } from '../firebase';
import { ref, set } from "firebase/database";

// Firebase DB
const db = database;

interface ProductPostProperties { 
    navigation: any;
}

export default function UserProductReviewPage(props: ProductPostProperties) {
    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);
    const [image, setImage] = React.useState(null);

    const imageArray = 
    [
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Simpson_Burger%2C_XV_Burger%2C_Montparnasse%2C_Paris_002.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bachi_Burger_-_Las_Vegas.jpg", 
        "https://upload.wikimedia.org/wikipedia/commons/b/b7/Burger_King_double_cheeseburger.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f5/Bulgogi_burger.jpg"
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

    const sendTags = async(randomReviewID, randomNumImage) => {
         // Tag the appropriate image
         const url = 'http://127.0.0.1:5001/whatworks-ac068/us-central1/widgets/tagReview';

         let data = {
            method: 'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userReviewID: `${randomReviewID}`,
                title: `${title}`,
                imageURL: `${imageArray[randomNumImage]}`
            }),
            
          }

        fetch(`${url}`, data)
        .then((response) => response.text())
        .then((responseJson) => {
            console.log(responseJson);
        });
    };

    // Database Routes
    //> userReviewIndex
    //> DummyIndex
    //> userCreatedReviews
    //> DummyReviews
    const writeReviewData = () => {
        let randomReviewID = randomIntFromInterval(0,1000);
        let randomNumUser = randomIntFromInterval(0,6);
        let randomNumImage = randomIntFromInterval(0,3);

        sendTags(randomReviewID, randomNumImage);

        // Write the review index
        set(ref(db, 'DummyIndex/' + randomReviewID), {
            userReviewID: `${randomReviewID}`,
            title: `${title}`,
            imageURL: `${imageArray[randomNumImage]}`
        });
        // Write the core review
        set(ref(db, 'DummyReviews/' + randomReviewID), {
            username: `${userArray[randomNumUser]}`,
            title: `${title}`,
            imageURL: `${imageArray[randomNumImage]}`,
            review: `${review}`
        });
    }


    // Submission
    const onPressPostReview = async () => { 
        writeReviewData();
        // props.navigation.navigate('MainScreen');
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
    //   backgroundColor :'#bfeaff',
      marginBottom:30
       },
    background: {
        // backgroundColor:'#bfeaff',
        backgroundColor: "white", 
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
  