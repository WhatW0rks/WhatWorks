import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import { TextInput, Button, Snackbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CategoryFoodTags, CategoryNonFoodTags, CategoryRestrauntTags, MasterTagList } from '../assets/tags/tags'

// Lottie Animations
import Lottie from 'lottie-react-native';

// Firebase 
import { database } from '../firebase';
import { storage } from '../firebase';
import { ref, set } from "firebase/database";
import { getDownloadURL, ref as Fireref, uploadBytes } from "firebase/storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { useRef } from 'react';

// Firebase DB and Storage
const db = database;
const fireStore = storage;

interface ProductPostProperties { 
    navigation: any;
    route: any;
}

export default function ProductReviewForm({ route, navigation }) {
    const { reference } = route.params;

    React.useImperativeHandle(reference, () => ({
        submitWrapper() {
            onPressPostReview();
        },
    }));

    const animationRef = useRef<Lottie>(null)

    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);

    // Image States
    const [image, setImage] = React.useState(null);
    const [imageList, setImageList] = React.useState([]);

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
    
        if (!result.cancelled) {
            const { uri } = result as ImageInfo; 
            setImage(uri);

            // Add to Image URI List
            let tempArr = imageList;
            tempArr.push(uri);
            setImageList(tempArr);

        }

        animationRef.current?.play();
    };

    const writeReviewData = async () => {
        let randomReviewID = randomIntFromInterval(0,1000);
        let randomNumUser = randomIntFromInterval(0,6);

        let Tags = valueTag;
        if (Tags[0] == "") Tags.shift();
        // Tag Guard
        if (Tags.length <= 2 || Tags.length >= 10){
            onToggleSnackBar();
            return;
        }

        // Image Guard
        if (imageList.length === 0) {
            return;
        }

        let stringfyTags = String(Tags);
        let tagArray =  JSON.parse(JSON.stringify(Tags)) as typeof Tags;

        // There are empty tags, fill with '!' string
        for (let i = 0; i < 9; i++) {
            tagArray.push("!");
        }

        const response = await fetch(imageList[0]);
        const blob = await response.blob();

        const reviewRef = Fireref(fireStore, `${randomReviewID}`);

        uploadBytes(reviewRef, blob).then((snapshot) => {
            // Now we get the download URL to propogate into the imageURL for reviews
            getDownloadURL(Fireref(fireStore, `${randomReviewID}`))
            .then((url) => {
                // Write the review index
                set(ref(db, 'DummyIndex/' + randomReviewID), {
                    userReviewID: `${randomReviewID}`,
                    title: `${title}`,
                    imageURL: `${url}`
                });
                // Write the core review
                set(ref(db, 'DummyReviews/' + randomReviewID), {
                    username: `${userArray[randomNumUser]}`,
                    title: `${title}`,
                    imageURL: `${url}`,
                    review: `${review}`,
                    tags: `${stringfyTags}`
                });
                // Write the review index
                set(ref(db, 'TagReviews/' + randomReviewID), {
                    userReviewID: `${randomReviewID}`,
                    title: `${title}`,
                    imageURL: `${url}`,
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

                console.log("Upload Operation Finished");
            });
        }); 
    }


    // Submission
    const onPressPostReview = async () => { 
        await writeReviewData().then(()=> {
            navigation.goBack();
        });
        // props.navigation.navigate('MainScreen');
    } 

    React.useEffect(()=> {
        DropDownPicker.setListMode("SCROLLVIEW");
    }, [imageList]);
    
    return (
    <SafeAreaView style={styles.background}>
        <ScrollView contentContainerStyle={{display: "flex", justifyContent: "center"}}>
            {/* Snackbar Warning */}
            <Snackbar
                wrapperStyle={{ top: 0, zIndex: 100 }}
                visible={visibleSnack}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss'
                }}>
                Please input about 2 to 10 tags!
            </Snackbar>
            
            {/* Title/Header */}
            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                style={styles.titleInput}
                activeUnderlineColor="white"
                placeholder="Add a Title"
                maxLength={1000}
                underlineColor="white"
                dense={true}
            />

            {/* Subtext or Description Body */}
            <TextInput 
                multiline={true}
                style={styles.descriptionInput}
                activeUnderlineColor="white"
                onChangeText={onChangeReview}
                value={review}
                placeholder="I loved this :^) / I dislike this :^( ..."
                maxLength={1000}
                underlineColor="white"
            />
            <View style={styles.imageContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollHorizontal}>
                    {imageList?.map((uri) => {
                        return(<Image source={{ uri: `${uri}` }} style={styles.image}/>);
                    })}
                    <Button onPress={pickImage} style={styles.imageButton}>
                        <Lottie style={{height: 120, width: 130, display: "flex", justifyContent: "center", alignItems:"center"}} ref={animationRef} source={require('../assets/LottieAnimations/camera.json')} loop={false}/>
                    </Button>
                </ScrollView>
            </View>
             
        
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

            <View style={styles.tagDropdownContainer}>
                <View style={styles.tagDropdown}>
                    <DropDownPicker
                    placeholder="Please Select 2 to 10 Tags"
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
            <View style={styles.animationBottom}>
                <Lottie style={{height: 265, width: 400}} source={require('../assets/LottieAnimations/clouds.json')} autoPlay loop></Lottie>
            </View>
        </ScrollView>
    </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    titleInput: {
        backgroundColor: "white",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10
    },
    descriptionInput: { 
        backgroundColor: "white",
        color: "black",
        marginBottom: 10
    },
    imageContainer: {
        width: "100%",
        display: "flex",
    },
    scrollHorizontal: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    imageButton: {
        justifyContent:"flex-start",
        alignItems: "flex-start",
        height: 130,
        width: 150,
        margin: 15
    },
    animationBottom: {
        width: "100%",
        float: "right",
        marginTop: 90
    },
    background: {
        backgroundColor: "white", 
        flex: 1, 
        height: "100%"
    },
    image: { 
        height: 120, 
        width: 120,
        marginLeft: 10
    }, 
    tagDropdown: {
        width: "80%"
    }, 
    tagDropdownContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
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
  