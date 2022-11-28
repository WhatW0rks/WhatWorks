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

// UI
import { Image } from '@rneui/themed';
import ReviewContext from '../../reviewSelectorContext';


export default function ProfileContentLoader({navigation}) {
    const [reviewData, setReviewData] = React.useState([]);
    const {setReview, review} = React.useContext(ReviewContext);

    let username = useAppSelector(selectUsername); 

    const fetchReviewData = async() => {
        console.log("We are looking at user: ", username);

        try {
          const userIndexReviewsRoute = ref(db, 'UserTriedData/' + username + '/' + "Trying");
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
        fetchReviewData();
      }, [username]);

    return(
        <View style={styles.exploreContainer}>
          <ScrollView nestedScrollEnabled={true} style={{width: "100%"}}>
            {reviewData?.map((r) => {
              return(
                <Pressable onPress={() => {
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
                    key={r[3]}
                    >
                      <Image style={{height: 100, width: 100, borderRadius: 5}} source={{ uri: `${r[2]}` }}></Image>
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
        height: 500,
        backgroundColor:"white"
    },
});