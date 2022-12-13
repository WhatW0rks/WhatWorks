import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, View, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import { TextInput, Button, Snackbar, List } from 'react-native-paper';
import { CategoryFoodTags, CategoryNonFoodTags, CategoryRestrauntTags, MasterTagList } from '../assets/tags/tags'

// Lottie Animations
import Lottie from 'lottie-react-native';

// UI Icons
import Ionicons from '@expo/vector-icons/Ionicons';

// Firebase 
import { database } from '../firebase';
import { storage } from '../firebase';
import { child, get, ref, set } from "firebase/database";
import { getDownloadURL, ref as Fireref, uploadBytes } from "firebase/storage";
import DropDownPicker from 'react-native-dropdown-picker';
import { useRef } from 'react';

// Firebase DB and Storage
const db = database;
const fireStore = storage;

// UI Kitten
import { Layout, Select, SelectItem, Input, IndexPath } from '@ui-kitten/components';

// React UI Elements
import { ListItem } from '@rneui/themed';

// React Button Group
import ButtonToggleGroup from 'react-native-button-toggle-group';

// Stats list
import Statistics from '../StatisticsList'

// UUID Unique Key
import uuid from 'react-native-uuid';

// Redux
import { selectUsername } from '../userSlice';
import { useAppSelector } from '../hooks';

interface ProductPostProperties { 
    navigation: any;
    route: any;
}

export interface NutritionStats { 
    Fiber: string; 
    Fat: string; 
    Protein: string; 
    Sugars: string; 
    Calories: string; 
    Rating: string; 
}

export default function ProductReviewForm({ route, navigation }) {
    let usernames = useAppSelector(selectUsername); 

    const { reference } = route.params;

    React.useImperativeHandle(reference, () => ({
        submitWrapper() {
            onPressPostReview();
        },
    }));

    const animationRef = useRef<Lottie>(null)

    const [title, onChangeTitle] = React.useState(null);
    const [review, onChangeReview] = React.useState(null);

    // Works or Did not Work
    const [works, setWorks] = React.useState("");

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

    // Drawer States
    const [expanded, setExpanded] = React.useState(null);
    const [expandedTags, setExpandedTags] = React.useState(null);

    // Button Group States
    const [value, setValue] = React.useState('Light');

    // Simplified Nutrition State 
    const [nutrition, setNutrition] = React.useState<NutritionStats>({Fiber: '', Calories: '', Fat: '', Protein: '', Sugars: '', Rating: ''}); 

    // Stats Dropdown
    // const [selectedIndex1, setSelectedIndex1] = React.useState(new IndexPath(0));
    // const displayValue1 = Statistics[selectedIndex1.row];
    // const [inputValue1, setInputValue1] = React.useState("Select");

    // const [selectedIndex2, setSelectedIndex2] = React.useState(new IndexPath(0));
    // const displayValue2 = Statistics[selectedIndex2.row];
    // const [inputValue2, setInputValue2] = React.useState("Select");

    // const [selectedIndex3, setSelectedIndex3] = React.useState(new IndexPath(0));
    // const displayValue3 = Statistics[selectedIndex3.row];
    // const [inputValue3, setInputValue3] = React.useState("Select");

    // const [selectedIndex4, setSelectedIndex4] = React.useState(new IndexPath(0));
    // const displayValue4 = Statistics[selectedIndex4.row];
    // const [inputValue4, setInputValue4] = React.useState("Select");

    // const [selectedIndex5, setSelectedIndex5] = React.useState(new IndexPath(0));
    // const displayValue5 = Statistics[selectedIndex5.row];
    // const [inputValue5, setInputValue5] = React.useState("Select");

    // const [selectedIndex6, setSelectedIndex6] = React.useState(new IndexPath(0));
    // const displayValue6 = Statistics[selectedIndex6.row];
    // const [inputValue6, setInputValue6] = React.useState("Select");

    // const [selectedIndex7, setSelectedIndex7] = React.useState(new IndexPath(0));
    // const displayValue7 = Statistics[selectedIndex7.row];
    // const [inputValue7, setInputValue7] = React.useState("Select");

    // const [selectedIndex8, setSelectedIndex8] = React.useState(new IndexPath(0));
    // const displayValue8 = Statistics[selectedIndex8.row];
    // const [inputValue8, setInputValue8] = React.useState("Select");

    // const [selectedIndex9, setSelectedIndex9] = React.useState(new IndexPath(0));
    // const displayValue9 = Statistics[selectedIndex9.row];
    // const [inputValue9, setInputValue9] = React.useState("Select");
    

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

    const awardToken = async () => {
        get(child(ref(db), `Tokens/${usernames}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();

                set(ref(db, 'Tokens/' + usernames), {
                    amount: data.amount + 100
                });
            } else {
                set(ref(db, 'Tokens/' + usernames), {
                    amount: 100
                });
            }
        })
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
        if (Tags.length < 2 || Tags.length > 10){
            // onToggleSnackBar();
            // return;
            Alert.alert(
                "Unable to post review",
                "Please include between 2 and 10 tags in your review!",
                [
                
                  { text: "Got it!", onPress: () => console.log("OK Pressed") }
                ]
              );
        }


        // Image Guard
        else if (imageList.length === 0 || imageList.length > 1) {
            // Reset Image List
            // setImageList([]);
            // return;
            Alert.alert(
                "Unable to post review",
                "Please include an image in your review!",
                [
                
                  { text: "Got it!", onPress: () => console.log("OK Pressed") }
                ]
              );
        }

        // Title Guard
        else if (!title) {
            // Reset Image List
            // setImageList([]);
            // return;
            Alert.alert(
                "Unable to post review",
                "Please include a title in your review!",
                [
                
                  { text: "Got it!", onPress: () => console.log("OK Pressed") }
                ]
              );
        }

        // Title Guard
        else if (!review) {
            // Reset Image List
            // setImageList([]);
            // return;
            Alert.alert(
                "Unable to post review",
                "Please include a description in your review!",
                [
                
                  { text: "Got it!", onPress: () => console.log("OK Pressed") }
                ]
              );
        }

        let stringfyTags = String(Tags);
        let tagArray =  JSON.parse(JSON.stringify(Tags)) as typeof Tags;

        // There are empty tags, fill with '!' string
        for (let i = 0; i < 9; i++) {
            tagArray.push("!");
        }

        // Temporary Review Making

        // Write the review index for explore page
        // set(ref(db, 'Index/' + randomReviewID), {
        //     userReviewID: `${randomReviewID}`,
        //     title: `${title}`,
        //     imageURL: `https://upload.wikimedia.org/wikipedia/commons/c/cc/02021_0459_%284%29_Galician_dumplings_as_a_symbolic_food_for_the_Lunar_New_Year.jpg`
        // });
        // // Write the core review
        // set(ref(db, 'Reviews/' + randomReviewID), {
        //     username: `${userArray[randomNumUser]}`,
        //     title: `${title}`,
        //     imageURL: `https://upload.wikimedia.org/wikipedia/commons/c/cc/02021_0459_%284%29_Galician_dumplings_as_a_symbolic_food_for_the_Lunar_New_Year.jpg`,
        //     review: `${review}`,
        //     tags: `${stringfyTags}`
        // });
        // // Write the review index
        // set(ref(db, 'TagReviews/' + randomReviewID), {
        //     userReviewID: `${randomReviewID}`,
        //     title: `${title}`,
        //     imageURL: `https://upload.wikimedia.org/wikipedia/commons/c/cc/02021_0459_%284%29_Galician_dumplings_as_a_symbolic_food_for_the_Lunar_New_Year.jpg`,
        //     tags: `${stringfyTags}`,
        //     tag1: `${tagArray[0]}`,
        //     tag2: `${tagArray[1]}`,
        //     tag3: `${tagArray[2]}`,
        //     tag4: `${tagArray[3]}`,
        //     tag5: `${tagArray[4]}`,
        //     tag6: `${tagArray[5]}`,
        //     tag7: `${tagArray[6]}`,
        //     tag8: `${tagArray[7]}`,
        //     tag9: `${tagArray[8]}`,
        //     tag10: `${tagArray[9]}`
        // });


        let response = await fetch(imageList[0]);

        // Manipulate image and save as png 
        const decompress = await ImageManipulator.manipulateAsync(
            response.url,
            [],
            { compress: 0, format: ImageManipulator.SaveFormat.JPEG }
            );
        

        response = await fetch(decompress.uri);

       
        
        const blob = await response.blob();

        const reviewRef = Fireref(fireStore, `${randomReviewID}`);

        uploadBytes(reviewRef, blob).then((snapshot) => {
            // Now we get the download URL to propogate into the imageURL for reviews
            getDownloadURL(Fireref(fireStore, `${randomReviewID}`))
            
            .then((url) => {

                // Write the review index for the explore page
                set(ref(db, 'Index/' + randomReviewID), {
                    userReviewID: `${randomReviewID}`,
                    title: `${title}`,
                    imageURL: `${url}`
                });
                // Write the core review
                set(ref(db, 'Reviews/' + randomReviewID), {
                    username: `${userArray[randomNumUser]}`,
                    title: `${title}`,
                    imageURL: `${url}`,
                    review: `${review}`,
                    tags: `${stringfyTags}`, 
                    Calories: `${nutrition.Calories}`,
                    Fat: `${nutrition.Fat}`,
                    Fiber: `${nutrition.Fiber}`,
                    Protein: `${nutrition.Protein}`,
                    Sugars: `${nutrition.Sugars}`,
                    Rating: `${nutrition.Rating}`,
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

                // Write this review in works or not works!
                if (works !== "") {
                    if (works == "Works!") {
                        set(ref(db, 'UserReviewData/' + usernames + '/' + "Works" + '/' + randomReviewID), {
                            username: `${usernames}`,
                            title: `${title}`,
                            imageURL: `${url}`,
                            tags: `${stringfyTags}`
                        });
                    } else {
                        set(ref(db, 'UserReviewData/' + usernames + '/' + "DidntWork" + '/' + randomReviewID), {
                            username: `${usernames}`,
                            title: `${title}`,
                            imageURL: `${url}`,
                            tags: `${stringfyTags}`
                            
                        });
                    }
                    
                } else {
                    return;
                }
                

                console.log("Upload Operation Finished");
            });
        }); 
        // console.log("Upload Operation Finished");
    }


    // Submission
    const onPressPostReview = async () => { 
        console.log("Post button pressed");
        await writeReviewData().then(()=> {
            awardToken();
            navigation.goBack();
        });
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
                placeholder="What's the name of this product?"
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
                placeholder="Tell us about it!"
                maxLength={1000}
                underlineColor="white"
            />
            <View style={styles.imageContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollHorizontal}>
                    {imageList?.map((uri) => {
                        return(
                        <View>
                            <Image key={`${uuid.v4()}`} source={{ uri: `${uri}` }} style={styles.image}/>
                            <Ionicons style={styles.close} name="ios-close-circle" size={25} onPress={() => setImageList([])} />
                        </View>);
                    })}
                     {imageList.length == 0 ? <Button onPress={pickImage} style={styles.imageButton}>
                        <Lottie style={{height: 120, width: 130, display: "flex", justifyContent: "center", alignItems:"center"}} ref={animationRef} source={require('../assets/LottieAnimations/camera.json')} loop={false}/>
                    </Button> : null }
                </ScrollView>
            </View>

            {/* Works or Didnt Work */}
            <View>
                <ButtonToggleGroup
                    style={{marginTop: 5, marginLeft: 10, marginRight: 10}}
                    highlightBackgroundColor={"#37aca4"}
                    highlightTextColor={"white"}
                    inactiveBackgroundColor={'transparent'}
                    inactiveTextColor={'grey'}
                    values={['Works!', "Didn't Work"]}
                    value={works}
                    onSelect={val => setWorks(`${val}`)}
                />
            </View>

            {/* Drawers */}
            <ListItem.Accordion
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Product Statistics</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                  isExpanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
            >
                <ListItem.Content style={{marginBottom: 30}}>
                    <View style={{width: "100%"}}>
                        <View style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start"}}>
                            <Text style={{marginLeft: 20, fontSize: 15}}>Rating</Text>
                        </View>
                        
                        <ButtonToggleGroup
                            style={{marginTop: 5}}
                            highlightBackgroundColor={"#37aca4"}
                            highlightTextColor={"white"}
                            inactiveBackgroundColor={'transparent'}
                            inactiveTextColor={'grey'}
                            values={['1', '2', '3', '4', '5']}
                            value={value}
                            onSelect={val => setValue(val)}
                        />

                        <View style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 20, marginBottom: 8}}>
                            <Text style={{marginLeft: 20, fontSize: 15}}>Statistics</Text>
                        </View>

                        <Layout style={styles.rowContainer}>

                        {/* Statistic 1 */}
                        <View 
                        // style={{display: "flex", flexDirection: "row"}}
                        >
                            {/* <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue1}
                                    selectedIndex={selectedIndex1}
                                    onSelect={index => setSelectedIndex1(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout> */}
                            <Input
                               label={() => <Text style={{fontSize: 14, color: "#37aca4", marginBottom: 5, fontWeight:"600"}}>Fat</Text>}                                 
                               style={styles.stat}
                               placeholder='4g'
                               value={nutrition.Fat}
                               onChangeText={input => setNutrition((prev) => ({...prev, Fat: input}))}
                            />
                        </View>

                        {/* Statistic 2 */}
                        <View 
                        // style={{display: "flex", flexDirection: "row"}}
                        >
                            {/* <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue2}
                                    selectedIndex={selectedIndex2}
                                    onSelect={index => setSelectedIndex2(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout> */}
                            <Input
                               label={() => <Text style={{fontSize: 14, color: "#37aca4", marginBottom: 5, fontWeight:"600"}}>Fiber</Text>}                                 
                               style={styles.stat}
                                placeholder='7g'
                                value={nutrition.Fiber}
                                onChangeText={input => setNutrition((prev) => ({...prev, Fiber: input}))}
                            />
                        </View>
                        </Layout>

                        {/* Statistic 3 */}
                        <Layout style={styles.rowContainer}>
                        <View 
                        // style={{display: "flex", flexDirection: "row"}}
                        >
                            {/* <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue3}
                                    selectedIndex={selectedIndex3}
                                    onSelect={index => setSelectedIndex3(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout> */}
                            <Input
                               label={() => <Text style={{fontSize: 14, color: "#37aca4", marginBottom: 5, fontWeight:"600"}}>Sugars</Text>}                                 
                               style={styles.stat}
                                placeholder='5g'
                                value={nutrition.Sugars}
                                onChangeText={input => setNutrition((prev) => ({...prev, Sugars: input}))}
                                
                            />
                        </View>
                      
                        
                        {/* Statistic 4 */}
                        <View 
                        // style={{display: "flex", flexDirection: "row"}}
                        >
                            {/* <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue4}
                                    selectedIndex={selectedIndex4}
                                    onSelect={index => setSelectedIndex4(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout> */}
                            <Input
                               label={() => <Text style={{fontSize: 14, color: "#37aca4", marginBottom: 5, fontWeight:"600"}}>Protein</Text>}                                 
                               style={styles.stat}
                                placeholder='11g'
                                value={nutrition.Protein}
                                onChangeText={input => setNutrition((prev) => ({...prev, Protein: input}))}

                            />
                        </View>
                        </Layout>

                        <Layout style={styles.rowContainer}>

                        {/* Statistic 5 */}
                        <View 
                        // style={{display: "flex", flexDirection: "row"}}
                        >
                            {/* <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue5}
                                    selectedIndex={selectedIndex5}
                                    onSelect={index => setSelectedIndex5(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout> */}
                            <Input
                               label={() => <Text style={{fontSize: 14, color: "#37aca4", marginBottom: 5, fontWeight:"600"}}>Calories</Text>}                                 
                               style={styles.stat}
                                placeholder='300'
                                value={nutrition.Calories}
                                onChangeText={input => setNutrition((prev) => ({...prev, Calories: input}))}
                            />
                        </View>
                        </Layout>

                        {/* Statistic 6 */}
                        {/* <View style={{display: "flex", flexDirection: "row"}}>
                            <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue6}
                                    selectedIndex={selectedIndex6}
                                    onSelect={index => setSelectedIndex6(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout>
                            <Input
                                style={{width: "46%", marginTop: 5, marginLeft: 10}}
                                placeholder='10 g'
                            />
                        </View> */}

                        {/* Statistic 7 */}
                        {/* <View style={{display: "flex", flexDirection: "row"}}>
                            <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue7}
                                    selectedIndex={selectedIndex7}
                                    onSelect={index => setSelectedIndex7(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout>
                            <Input
                                style={{width: "46%", marginTop: 5, marginLeft: 10}}
                                placeholder='89 mg'
                            />
                        </View> */}

                        {/* Statistic 8 */}
                        {/* <View style={{display: "flex", flexDirection: "row"}}>
                            <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue8}
                                    selectedIndex={selectedIndex8}
                                    onSelect={index => setSelectedIndex8(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout>
                            <Input
                                style={{width: "46%", marginTop: 5, marginLeft: 10}}
                                placeholder='10 mg'
                            />
                        </View> */}

                        {/* Statistic 9 */}
                        {/* <View style={{display: "flex", flexDirection: "row"}}>
                            <Layout style={styles.container} level='1'>
                                <Select
                                    value={displayValue9}
                                    selectedIndex={selectedIndex9}
                                    onSelect={index => setSelectedIndex9(index)}>
                                    {Statistics?.map((value) => {
                                        return(<SelectItem key={`${uuid.v4()}`} title={`${value}`} />)
                                    })}
                                </Select>
                            </Layout>
                            <Input
                                style={{width: "46%", marginTop: 5, marginLeft: 10}}
                                placeholder='67 mg'
                            />
                        </View> */}

                    </View>
                </ListItem.Content>
            </ListItem.Accordion>

            <ListItem.Accordion
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Tags</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                  isExpanded={expandedTags}
                  onPress={() => {
                    setExpandedTags(!expandedTags);
                  }}
            >
                <ListItem.Content style={{marginBottom: 30, display: "flex", alignItems: "center", justifyContent:"center"}}>
                    <View style={styles.tagDropdownContainer}>
                        <View style={styles.tagDropdown}>
                            <DropDownPicker
                            
                            placeholder="Please select 2-10 tags!"
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
                </ListItem.Content>
            </ListItem.Accordion>

            
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
    },

    container: {
        minHeight: 50,
        marginTop: 5,
        width: "46%",
        marginLeft: 10
      },
      
      close: {
        margin: 5,
        position: "absolute",
        top: -7,
        left: 0,
        width: 25,
        height: 25,
        color: "tomato"
      }, 
      rowContainer: { 
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }, 
      stat: { 
        flex: 1, 
        margin: 2,  
        marginTop: 5, 
        marginLeft: 20, 
        width: 170, 
        paddingRight: 25,
        
      }, 
      
  });
  