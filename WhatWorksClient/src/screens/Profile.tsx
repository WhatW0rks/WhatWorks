import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

// Expo Fonts
import { useFonts } from 'expo-font';

// Firebase DB
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// UI
import { Avatar } from '@rneui/themed';

// Component for React Navigation Tabs
import Trying from '../components/smallComponents/profileContentLoader'
import Works from '../components/smallComponents/WorksComp'
import NotWorks from '../components/smallComponents/NotWorksComp'

// Lottie Animations
import Lottie from 'lottie-react-native';

// Firebase DB
const db = database;

// redux
import { switchPhoto } from '../userSlice';

// React Navigation Tabs Creator
const Tab = createMaterialTopTabNavigator();  


export default function Profile({navigation}) {
    // Profile states
    const [profileDisplayName, setprofileDisplayName] = React.useState("N/A");
    const [profileBio, setprofileBio] = React.useState("N/A");
    const [profileCondition, setprofileCondition] = React.useState("N/A");
    const [profileYOE, setprofileYOE] = React.useState("N/A");
    const [profileAvatar, setprofileAvatar] = React.useState('https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg');

    const fetchProfileData = () => {
        try {
            const userIndexReviewsRoute = ref(db, 'Profiles/' + username);
            onValue(userIndexReviewsRoute, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                
                    // Setting values
                    setprofileDisplayName(data.displayName);
                    setprofileBio(data.bio);
                    setprofileCondition(data.condition);
                    setprofileYOE(data.yoe);
                    setprofileAvatar(data.profilePhoto);
                    switchPhoto(data.profilePhoto); 

                }
            });
      
          } catch (e) {
            console.log("Error: ", e)
          }
    }

    React.useEffect( () => {
        fetchProfileData();
    }, [])


    const dispatch = useAppDispatch(); 
    let username = useAppSelector(selectUsername); 

    const animationRef = React.useRef<Lottie>(null)

    // Fonts
    const [fontsLoaded] = useFonts({
        'Futura-Light': require('../assets/fonts/futura_light.ttf'),
        'Futura-Medium': require('../assets/fonts/futura_medium.ttf'),
        'Futura-Bold': require('../assets/fonts/futura_bold.ttf'),
    });

    const onPressSwitch = () => { 
        dispatch(switchUser());
    }


    const fetchReviewData = async() => {
        try {
            let url = 'UserTriedData/' + username + '/';
            const userIndexReviewsRoute = ref(db, url);
            onValue(userIndexReviewsRoute, (snapshot) => {
                const data = snapshot.val();   
                console.log("Just fetched!"); 

                // Retrieve data for a specific user 
                for (let key in data) {
                    if (!data.hasOwnProperty(key)) continue;
                    if (key == 'liked')  {
                        dispatch(initializeLiked(data[key]));
                    }
                    else if (key=='disliked') { 
                        dispatch(initializeDisliked(data[key])); 
                    }
                }
          });
    
        } catch (e) {
          console.log("Error: ", e)
        }
      }

      React.useEffect(() => {
        // Fetch Review Data
        fetchReviewData();
      }, [username]);

      return (
        <SafeAreaView style={styles.Container}>
            <ScrollView contentContainerStyle={{flex: 1}}>

                {/* Profile Header Container */}
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "column"}}>
                        <Avatar size={150} avatarStyle={styles.avatar} rounded source={{uri: profileAvatar}}></Avatar>
                    </View>
                    
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {profileDisplayName}
                            </Text>
                        </View>

                        <View style={styles.profileInfoContainer}>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Condition:</Text>
                                <Text style={styles.Stat}>{profileCondition}</Text>
                            </View>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Experience:</Text>
                                <Text style={styles.Stat}>{profileYOE}</Text>
                            </View>
                        </View>

                    </View>
                    
                    {/* Add info to profile */}
                    <View>
                        <TouchableOpacity onPress={() => {
                            // Navigate to Profile Edit Screen
                            animationRef?.current.play();
                            navigation.navigate("ProfileEditScreen");
                        }}>
                            <Lottie style={{height: 50, width: 50}} source={require('../assets/LottieAnimations/setting.json')} loop={false} ref={animationRef}></Lottie>
                        </TouchableOpacity>  
                    </View>
                </View>

                <View style={{display: "flex", marginLeft: 10, marginRight: 10}}>
                    <Text style={{fontSize: 13}}>
                        <Text style={{fontWeight: "bold"}}>{`@${username}`} </Text>
                        {profileBio}
                    </Text>
                </View>

                {/* Tabs for different data */}
                    <NavigationContainer independent={true}>
                        <Tab.Navigator 
                        screenOptions={{
                            tabBarLabelStyle: {fontSize: 10, fontWeight: "700"},
                            tabBarIndicatorStyle: {backgroundColor:"#37aca4"}
                        }}>
                            <Tab.Screen name="What Works" children={()=> <Works navigation={navigation}></Works>} />
                            <Tab.Screen name="Want to Try" children={()=> <Trying navigation={navigation}></Trying>}/>
                            <Tab.Screen name="What Doesn't Work" children={()=> <NotWorks navigation={navigation}></NotWorks>} />
                        </Tab.Navigator>
                    </NavigationContainer>
                {/* <Button onPress={onPressSwitch} title="Switch user!"/> */}

            </ScrollView>
        </SafeAreaView>

      ); 

}
const styles = StyleSheet.create({ 
    Container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
    }, 
    avatar: { 
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    }, 
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: 15
    },
    title: { 
        fontSize: 30, 
        fontWeight: "800", 
        fontFamily: "Futura-Bold"
    }, 

    profileInfoContainer: {
        display: "flex",
        flexDirection: "row"
    },

    profileStateMiniContainer: {
        margin: 10
    },
    profileStat: {
        fontSize: 11,
        fontWeight: "700",
        fontFamily: "Futura-Medium"
    },
    Stat: {
        fontSize: 10,
        paddingTop: 3,
        fontFamily: "Futura-Medium"
    },
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    subheading: { 
        fontWeight:"300", 
        fontSize:18, 
        marginLeft:25, 
        marginBottom:10

    }
});