import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import { TextInput, Button, Snackbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CategoryFoodTags, CategoryNonFoodTags, CategoryRestrauntTags, MasterTagList } from '../assets/tags/tags'

// Firebase 
import { database } from '../firebase';
import { ref, set } from "firebase/database";
import DropDownPicker from 'react-native-dropdown-picker';
import { tags } from 'react-native-svg/lib/typescript/xml';

// Firebase DB
const db = database;

interface ProductPostProperties { 
    navigation: any;
}

export default function ProductReviewForm(props: ProductPostProperties) {
    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);
    const [image, setImage] = React.useState(null);

    // Tagging States
    const [openCategory, setOpenCategory] = React.useState(false);
    const [valueCategory, setValueCategory] = React.useState(['']);
    const [itemsCategory, setItemsCategory] = React.useState(CategoryFoodTags);

    const [openTag, setOpenTag] = React.useState(false);
    const [valueTag, setValueTag] = React.useState(['']);
    const [itemsTag, setItemsTag] = React.useState(MasterTagList);

    // Snackbar States
    const [visibleSnack, setVisibleSnack] = React.useState(false);
    const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
    const onDismissSnackBar = () => setVisibleSnack(false);

    const imageArray = 
    [
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Petit_d%C3%A9jeuner_fran%C3%A7ais.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Golden_Grahams_cereal%2C_with_milk.jpg", 
        "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711",
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Pumpkin_Cheddar_Breakfast_Sandwich_-_New_Orleans.jpg"
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

    // Database Routes
    //> DummyIndex
    //> DummyReviews
    const writeReviewData = () => {
        let randomReviewID = randomIntFromInterval(0,1000);
        let randomNumUser = randomIntFromInterval(0,6);
        let randomNumImage = randomIntFromInterval(0,3);

        let Tags = valueTag;
        if (Tags[0] == "") Tags.shift();
        // Tag Guard
        if (Tags.length <= 2 || Tags.length >= 10){
            onToggleSnackBar();
            return;
        }

        let stringfyTags = String(Tags);
        let tagArray =  JSON.parse(JSON.stringify(Tags)) as typeof Tags;

        for (let i = 0; i < 9; i++) {
            tagArray.push("!");
        }

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
            review: `${review}`,
            tags: `${stringfyTags}`
        });
        // Write the review index
        set(ref(db, 'TagReviews/' + randomReviewID), {
            userReviewID: `${randomReviewID}`,
            title: `${title}`,
            imageURL: `${imageArray[randomNumImage]}`,
            tags: `${stringfyTags}`,
            tag1: `${tagArray[0]}`,
            tag2: `${tagArray[1]}`,
            tag3: `${tagArray[2]}`,
            tag4: `${tagArray[3]}`,
            tag5: `${tagArray[4]}`,
            tag6: `${tagArray[5]}`,
            tag7: `${tagArray[6]}`,
            tag8: `${tagArray[7]}`,
            tag9: `${tagArray[8]}`,
            tag10: `${tagArray[9]}`
        });
    }


    // Submission
    const onPressPostReview = async () => { 
        writeReviewData();
        // props.navigation.navigate('MainScreen');
        let Tags = valueTag;
        if (Tags[0] == "") Tags.shift();
        // Tag Guard
        if (Tags.length <= 2 || Tags.length >= 10){
            onToggleSnackBar();
            return;
        }
        props.navigation.goBack();
    } 

    React.useEffect(()=> {
        DropDownPicker.setListMode("SCROLLVIEW");
    }, []);
    
    return (
    <SafeAreaView style={styles.background}>
        <ScrollView>
            <Snackbar
                wrapperStyle={{ top: 0, zIndex: 100 }}
                visible={visibleSnack}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss'
                }}>
                Please input about 2 to 10 tags!
            </Snackbar>

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
        
            {/* <View style={styles.tagDropdownContainer}>
                <View style={styles.tagDropdown}>
                    <DropDownPicker
                    open={openCategory}
                    value={valueCategory}
                    items={itemsCategory}
                    setOpen={setOpenCategory}
                    setValue={setValueCategory}
                    setItems={setItemsCategory}
                    searchable={true}
                    theme="LIGHT"
                    multiple={true}
                    mode="BADGE"
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                    />
                </View>
            </View> */}

            <View style={styles.tagTitleContainer}>
                <Text style={styles.tagTitle}>Tags</Text>
            </View>

            <View style={styles.tagDropdownContainer}>
                <View style={styles.tagDropdown}>
                    <DropDownPicker
                    open={openTag}
                    value={valueTag}
                    items={itemsTag}
                    setOpen={setOpenTag}
                    setValue={setValueTag}
                    setItems={setItemsTag}
                    searchable={true}
                    theme="LIGHT"
                    multiple={true}
                    mode="BADGE"
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                    />
                </View>
            </View>
            <View style={styles.submissionContainer}>
                <Button
                mode='contained'
                onPress={onPressPostReview}
                color="#007cba"
                accessibilityLabel="Post your review"
                style={{width: "40%"}}
                >
                    Post review!
                </Button>
            </View>
        
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
    },
    tagDropdown: {
        width: "80%"
    }, 
    tagDropdownContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    submissionContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 200
    },
    tagTitleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    }, 
    tagTitle: {
        fontSize: 20,
        fontFamily:"Helvetica",
        fontWeight: "bold", 
        color: "#42b0f5"
    }
   
  });
  