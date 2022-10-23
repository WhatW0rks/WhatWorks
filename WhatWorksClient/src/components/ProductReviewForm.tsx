import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, Button, SafeAreaView, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

export default function UserProductReviewPage() {
    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);
    const [image, setImage] = React.useState(null);

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

    const onPressPostReview = () => { 
        console.log("Title:", title); 
        console.log("Review:", review);
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
  