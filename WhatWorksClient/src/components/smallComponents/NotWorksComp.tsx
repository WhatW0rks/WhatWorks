import * as React from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../../userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

// Firebase
import { database } from '../../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query } from "firebase/database";

// Firebase DB
const db = database;

// Lottie Animations
import Lottie from 'lottie-react-native';

// UUID Unique Key
import uuid from 'react-native-uuid';

// UI
import CachedImage from './CachedImage';
import ReviewContext from '../../reviewSelectorContext';


export default function NotWorksComp({navigation}) {
    // Animations
    const animationRef = React.useRef<Lottie>(null)

    const [reviewWorksData, setReviewWorksData] = React.useState([]);
    const [reviewData, setReviewData] = React.useState([]);
    const {setReview, review} = React.useContext(ReviewContext);


    let username = useAppSelector(selectUsername); 

    const Empty = () => {
      if (reviewWorksData.length == 0) {
          return(
              <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 60}}>
                  <Lottie style={{height: 200, width: 200}} source={require('../../assets/LottieAnimations/empty.json')} autoPlay loop></Lottie>
                  <Text style={{color: "#A9A9A9"}}>{"There is nothing here :^("}</Text>
              </View>
            )
        }
    }

    const fetchReviewData = async() => {
        try {
            const userIndexReviewsRoute = ref(db, 'UserReviewData/' + username + '/' + "DidntWork");
            onValue(userIndexReviewsRoute, (snapshot) => {
            const data = snapshot.val();

            let parsedData = [];

            // Retrieve data fields and parsing JSON object
            for (let key in data) {
                if (!data.hasOwnProperty(key)) continue;
                let temp = [data[key].username, data[key].title, data[key].imageURL, key];
                parsedData.push(temp);
            }

            setReviewWorksData(parsedData);
        });   
            } catch (e) {
                console.log("Error: ", e)
        }
    }

        React.useEffect(() => {
        // Fetch Review Data
        animationRef.current?.play(49, 49);
        fetchReviewData();
        }, [username]);

    return(
        <View style={styles.exploreContainer}>
            <ScrollView style={{width: "100%"}}>

            {Empty()}

            <View style={styles.reviewContainer}>
                    {/* {reviewWorksData.length != 0 ? 
                        <Pressable onPress={() => {
                            navigation.navigate("SubmitScreen");}}>
                            <Lottie style={{height: 120, width: 120}} source={require('../../assets/LottieAnimations/upload.json')} ref={animationRef} loop={false}></Lottie>
                        </Pressable>
                    : null} */}
                    {reviewWorksData?.map((r) => {
                    return(
                        <Pressable key={`${uuid.v4()}`} onPress={async () => {
                        setReview(r[3]);
                        navigation.navigate('PostScreen');
                        }}>
                            <View style={{
                                width: "100%", 
                                height: "100%", 
                                display: "flex", 
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: 5
                                }}
                                key={`${uuid.v4()}`}
                                >
                                <CachedImage style={{height: 115, width: 115, borderRadius: 5, marginBottom: 10}} source={{ uri: `${r[2]}` }} id={r[3]} navigation={navigation}></CachedImage>
                            </View>
                        </Pressable>
                    );
                    })}
                {/* </ScrollView> */}
            </View>

          </ScrollView>          
        </View>
    );
}

const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
    },
    list: {
        width: "100%",
        backgroundColor: 'white',
        flex: 1
    },
    item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
    },
    exploreContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
        backgroundColor:"white"
    },
    reviewContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        marginLeft: 5,
        marginTop: 10,
        height: 110
    },
    emptysearch: { 
        marginLeft: 20, 
        marginTop: 15, 
        marginRight: 8,
        fontSize: 15, 
        lineHeight:25, 
        color: 'gray',
      }
});