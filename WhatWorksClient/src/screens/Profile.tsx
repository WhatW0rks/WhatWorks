import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import TriedReview from '../components/smallComponents/TriedReview'; 
import { useAppDispatch, useAppSelector } from '../hooks';
// import { Avatar } from 'react-native-paper';
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// UI
import { Avatar } from '@rneui/themed';
import { Flex } from '@react-native-material/core';

// Component
import Trying from '../components/smallComponents/profileContentLoader'

// Lottie Animations
import Lottie from 'lottie-react-native';

// Firebase DB
const db = database;

// React Navigation Tabs Creator
const Tab = createMaterialTopTabNavigator();

// React Navigation tabs
function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <Lottie style={{height: 200, width: 200}} source={require('../assets/LottieAnimations/empty.json')} autoPlay loop></Lottie>
        <Text style={{color: "gray"}}>{"There is nothing here :^("}</Text>
      </View>
    );
  }
  
function SettingsScreen() {
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <Lottie style={{height: 200, width: 200}} source={require('../assets/LottieAnimations/empty.json')} autoPlay loop></Lottie>
        <Text style={{color: "gray"}}>{"There is nothing here :^("}</Text>
    </View>
);
}

export default function Profile({navigation}) {
    const dispatch = useAppDispatch(); 
    let username = useAppSelector(selectUsername); 
    let liked = useAppSelector(selectLiked);
    let disliked = useAppSelector(selectDisliked);

    let icon = ""

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
        <SafeAreaView style={styles.loadingContainer}>
            <ScrollView contentContainerStyle={{flex: 1}}>
                {/* Profile Header Container */}
                <View style={styles.header}>
                    {username === 'bob123' ? 
                    (  <Avatar size={150} avatarStyle={styles.avatar} rounded source={{uri:'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}></Avatar> )
                    :
                    (  <Avatar size={150} avatarStyle={styles.avatar} rounded source={{uri:'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg'}}></Avatar>  )

                    }
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {username}
                            </Text>
                        </View>

                        <View style={styles.profileInfoContainer}>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Condition:</Text>
                                <Text style={styles.Stat}>Acid Reflux</Text>
                            </View>
                            <View style={styles.profileStateMiniContainer}>
                                <Text style={styles.profileStat}>Experience:</Text>
                                <Text style={styles.Stat}>3 Years</Text>
                            </View>
                        </View>

                    </View>
                </View>

                {/* Tabs for different data */}
                    <NavigationContainer independent={true}>
                        <Tab.Navigator 
                        screenOptions={{
                            tabBarLabelStyle: {fontSize: 10, fontWeight: "700"}
                        }}>
                            <Tab.Screen name="What Works" component={HomeScreen} />
                            <Tab.Screen name="Want to Try" children={()=> <Trying navigation={navigation}></Trying>}/>
                            <Tab.Screen name="What Doesn't Work" component={SettingsScreen} />
                        </Tab.Navigator>
                    </NavigationContainer>
                {/* <Button onPress={onPressSwitch} title="Switch user!"/> */}

            </ScrollView>
        </SafeAreaView>

      ); 

}
const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
    }, 
    avatar: { 
        margin: 20, 
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
        fontWeight: "700"
    },
    Stat: {
        fontSize: 10,
        paddingTop: 3
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