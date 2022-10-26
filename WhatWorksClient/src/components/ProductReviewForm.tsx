import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, Button, SafeAreaView, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { AsyncStorage } from 'react-native';

import ContextCount from '../countContext';

interface ProductPostProperties { 
    navigation: any;
}

export default function UserProductReviewPage(props: ProductPostProperties) {
    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);
    const [image, setImage] = React.useState(null);

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const imageArray = 
    [
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Food_16.jpg",
        "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg", 
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Christmas_food_001.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Homemade_food_4.jpg"
                        ];

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

    // access the context value
    const {setCount, count} = React.useContext(ContextCount);


    // Submission
    const onPressPostReview = async () => { 
        // console.log("Title:", title); 
        // console.log("Review:", review);
        // console.log("The Count", count);

        // Try/Error for local storage persistance
        try {
            await  AsyncStorage.setItem(
                `${count}`,
                JSON.stringify({
                    title: `${title}`, 
                    user: "Jane Doe",
                    link: undefined,
                    image: imageArray[randomIntFromInterval(0, 3)],
                    review: `${review}`,
                    context: `${count}`,
                  })
              );

            // Update the contexts
            setCount(count + 1);
            

        } catch (e) {
            console.log("Error: ", e);
        }

        console.log("Retrieved data: ", await AsyncStorage.getItem(`${count}`));
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
  