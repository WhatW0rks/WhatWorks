import * as React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Profile Picker
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// React Native Paper
import { Button, Snackbar } from 'react-native-paper';

// UI Elements
import { Avatar } from '@rneui/themed';

// UI Icons
import Ionicons from '@expo/vector-icons/Ionicons';

// Expo Fonts
import { useFonts } from 'expo-font';

// UI Kitten
import {Input} from '@ui-kitten/components';

// Firebase DB
import { database, storage } from '../firebase';
import { child, get, onValue, ref, set } from "firebase/database";
import { ImageInfo } from 'expo-image-picker';

// Redux
import { selectUsername } from '../userSlice';
import { useAppSelector } from '../hooks';

// Firebase Storage
import { getDownloadURL, ref as Fireref, uploadBytes } from "firebase/storage";
const fireStore = storage;

const db = database;

export default function ProfileEditScreen({navigation}) {
    // username
    let username = useAppSelector(selectUsername); 

    const [profilePhoto, setProfilePhoto] = React.useState('https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg');
    const [selectedImageBool, setSelectedImageBool] = React.useState(false);

    // Text States
    const [displayName, setDisplayName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [condition, setCondition] = React.useState("");
    const [YOE, setYOE] = React.useState("");

      // Snackbar States
      const [visibleSnack, setVisibleSnack] = React.useState(false);
      const [error, setError] = React.useState("")
      const onToggleSnackBar = (err: string) => {
        setError(err);
        setVisibleSnack(!visibleSnack);
    }
      const onDismissSnackBar = () => setVisibleSnack(false);

    const getProfileInfo = () => {
        get(child(ref(db), `Profiles/${username}/`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();

                // Setting values
                setDisplayName(data.displayName);
                setBio(data.bio);
                setCondition(data.condition);
                setYOE(data.yoe);
                setProfilePhoto(data.profilePhoto);
            }
        })
    } 

    React.useEffect(() => {
        getProfileInfo();
    }, [])

    const pickProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0,
        });

        if (!result.cancelled) {
            const { uri } = result as ImageInfo; 
            setSelectedImageBool(true) // Let the program know that there is a new profile photo!
            setProfilePhoto(uri);
        }
    }

    const submitChanges = async() => { 
        // Text Guards
        if (displayName.length > 9 || displayName.length === 0) {
            onToggleSnackBar("Display Name: \nPlease enter less than 8 characters");
            return;
        }

        if (bio.length === 0) {
            onToggleSnackBar("Bio: \nBio cannot be empty!");
            return;
        }

        if (condition.length > 16 || condition.length === 0) {
            onToggleSnackBar("Condition: \nPlease enter less than 10 characters");
            return;
        }

        if (YOE.length > 16 || YOE.length === 0) {
            onToggleSnackBar("YOE: \nPlease enter less than 10 characters");
            return;
        }

        // After the guards, we can now set the profile information.

        // Check if a new image has been uploaded?
        if (selectedImageBool) {
            let response = await fetch(profilePhoto);

            // Manipulate image and save as jpeg for compression
            const decompress = await ImageManipulator.manipulateAsync(
            response.url,[],{ compress: 0, format: ImageManipulator.SaveFormat.JPEG });
            
            response = await fetch(decompress.uri);

            const blob = await response.blob();

            const reviewRef = Fireref(fireStore, `${username}`);

            uploadBytes(reviewRef, blob).then((snapshot) => {
                getDownloadURL(Fireref(fireStore, `${username}`))
                .then((url) => {
                    set(ref(db, 'Profiles/' + username), {
                        displayName: `${displayName}`,
                        bio: `${bio}`,
                        handle: `${username}`,
                        condition: `${condition}`,
                        yoe: `${YOE}`,
                        profilePhoto: `${url}`
                    });
                });
            });

        } else {
            // Write the profile information
            set(ref(db, 'Profiles/' + username), {
                displayName: `${displayName}`,
                bio: `${bio}`,
                handle: `${username}`,
                condition: `${condition}`,
                yoe: `${YOE}`,
                profilePhoto: `${profilePhoto}`
            });
        }

        console.log("Operation successful!");

        navigation.goBack();
    }

    const setTextVal = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(text);
    }

    // Fonts
    const [fontsLoaded] = useFonts({
        'Futura-Light': require('../assets/fonts/futura_light.ttf'),
        'Futura-Medium': require('../assets/fonts/futura_medium.ttf'),
        'Futura-Bold': require('../assets/fonts/futura_bold.ttf'),
    });

    return(
        <SafeAreaView style={styles.Container} edges={['left']}>
            <ScrollView style={{width: "100%"}}>
                {/* Snackbar Warning */}
                <Snackbar
                    wrapperStyle={{ top: 0, zIndex: 100 }}
                    style={{backgroundColor: "white"}}
                    visible={visibleSnack}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Dismiss'
                    }}>
                    <Text style={{color: "black"}}>{error}</Text>
                </Snackbar>
                <View style={{display:"flex", alignItems: "center", borderBottomColor: "#d3d3d3", borderBottomWidth: 0.2}}>
                    <Image style={{height: 150, width: 300, marginTop: -10}} source={require('../assets/WhatWorksLogo.png')}></Image>
                </View>

                <Pressable style={{position: 'absolute', borderRadius: 100, height: 100, width: 100, left: 5, top: "15%", zIndex: 10}} onPress={() => pickProfileImage()}>
                <View style={{position: 'absolute', borderRadius: 100, height: 100, width: 100, left: 5, top: "5%", zIndex: 1, opacity: 1, backgroundColor: "white"}}></View>
                    <Avatar size={300} containerStyle={{position: 'absolute', borderRadius: 100, height: 100, width: 100, left: 5, top: "5%", zIndex: 10, opacity: 0.5}} rounded source={{uri: profilePhoto}}></Avatar>
                    
                    <Ionicons style={{zIndex: 50, left: 70, top: "75%", color: "#e3e3e3"}} name="add-circle" size={30} />
                </Pressable>

                   <View style={{marginTop: 45, width: "100%", flex: 1, alignItems: "center"}}>
                        <View style={{display: "flex",  width: "90%", justifyContent: "flex-start", marginTop: 20}}>
                            <Text style={{fontSize: 17, fontWeight: "bold", fontFamily: "Futura-Medium" }}>Display Name</Text>
                        </View>
                        <View style={{width: "90%", marginBottom: 20}}>
                            <Input
                                size='large'
                                placeholder='What would you like to be called by?'
                                onChangeText={(v) => setTextVal(v, setDisplayName)}
                                caption={<Text>8 Characters Max.</Text>}
                                value={displayName}
                                />
                        </View> 
                        <View style={{display: "flex",  width: "90%", justifyContent: "flex-start"}}>
                            <Text style={{fontSize: 17,fontFamily: "Futura-Medium",  fontWeight: "bold"}}>Biography</Text>
                        </View>
                        <View style={{width: "90%", marginBottom: 20}}>
                            <Input
                            multiline={true}
                            style={{height: 100}}
                            textStyle={{ minHeight: 100 }}
                            placeholder='Tell us your story!'
                            onChangeText={(v) => setTextVal(v, setBio)}
                            value={bio}
                            />
                        </View>
                        <View style={{width: "90%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent:"space-between", marginTop: 20}}>
                            <View style={{display: "flex", width: "50%", alignContent: "center", justifyContent: "center", marginRight: 10}}>
                                <Text style={{fontSize: 15, fontFamily: "Futura-Medium", fontWeight: "bold"}}>Condition</Text>
                                <Input
                                textStyle={{ minHeight: 30 }}
                                onChangeText={(v) => setTextVal(v, setCondition)}
                                placeholder='Condition'
                                caption={<Text>15 Characters Max.</Text>}
                                value={condition}
                                />
                            </View>
                            <View>
                                <Text style={{fontSize: 15, fontFamily: "Futura-Medium", fontWeight: "bold"}}>Years of Experience</Text>
                                <Input
                                textStyle={{ minHeight: 30 }}
                                placeholder='YOE'
                                onChangeText={(v) => setTextVal(v, setYOE)}
                                caption={<Text>15 Characters Max.</Text>}
                                value={YOE}
                                />
                            </View>
                        </View>
                    </View> 

                    <View style={{width: "20%", height: 300, position: "absolute", bottom: "19%", right: 10}}>
                       <Button style={{borderRadius: 10, backgroundColor: "#4682B4"}} mode='contained' onPress={() => submitChanges()}>Save</Button> 
                    </View>    
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    Container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    avatar: { 
        margin: 20, 
    }, 
});