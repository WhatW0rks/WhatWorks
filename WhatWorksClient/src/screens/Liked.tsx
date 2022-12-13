import * as React from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query } from "firebase/database";

// Firebase DB
const db = database;

// Lottie Animations
import Lottie from 'lottie-react-native';

// UUID Unique Key
import uuid from 'react-native-uuid';

// UI
import { Image } from '@rneui/themed';
import CachedImage from '../components/smallComponents/CachedImage';
import ReviewContext from '../reviewSelectorContext';


export default function Liked({navigation}) {

    const [reviewData, setReviewData] = React.useState([]);
    const {setReview, review} = React.useContext(ReviewContext);

    let username = useAppSelector(selectUsername); 

    const Empty = () => {
        if (reviewData.length == 0) {
            return(
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 60}}>
                    <Lottie style={{height: 200, width: 200}} source={require('../assets/LottieAnimations/empty.json')} autoPlay loop></Lottie>
                    <Text style={{color: "#A9A9A9"}}>{"There is nothing here :^("}</Text>
                </View>
              )
          }
      }
  

    const fetchLikedData = async() => {
        try {
            const userIndexReviewsRoute = ref(db, 'UserTriedData/' + username + '/' + "liked");
            onValue(userIndexReviewsRoute, (snapshot) => {
            const data = snapshot.val();

            let parsedData = [];

            // Retrieve data fields and parsing JSON object
            for (let key in data) {
                if (!data.hasOwnProperty(key)) continue;
                let temp = [data[key].username, data[key].title, data[key].imageURL, key];
                parsedData.push(temp);
            }

            setReviewData(parsedData);
        });   
            } catch (e) {
                console.log("Error: ", e)
        }
    }

    React.useEffect(() => {
        // Fetch Review Data
        fetchLikedData();
        }, [username]);

    return(
        <View style={styles.exploreContainer}>
            <ScrollView style={{width: "100%"}}>

            {Empty()}

            {reviewData?.map((r) => {
              return(
                <Pressable key={`${uuid.v4()}`} onPress={async () => {
                  setReview(r[3]);
                  navigation.navigate('PostScreen');
                }}>
                  <View style={{
                    width: "100%", 
                    height: 100, 
                    display: "flex", 
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5
                      }}
                    key={`${uuid.v4()}`}
                    >
                      <Image style={{height: 100, width: 100, borderRadius: 5}} source={{ uri: `${r[2]}` }}></Image>
                      {/* <CachedImage style={{height: 100, width: 100, borderRadius: 5}} source={{ uri: `${r[2]}` }} id={r[3]} navigation={navigation}/> */}
                      <View style={{display: "flex", flexDirection:"column"}}>
                        <Text style={{marginLeft: 20, fontWeight: "bold", fontSize: 20}}>{`${r[1]}`}</Text>
                        <Text style={{marginLeft: 20, fontSize: 13}}>{`By ${r[0]}`}</Text>
                      </View>
                    </View>
                </Pressable>
              );
            })}

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
        flex: 1,
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


