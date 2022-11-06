import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, View, FlatList, ActivityIndicator} from 'react-native';
import { Button } from "@rneui/themed";

// React Screen Components
import LoadingScreen from './LoadingScreen';

// UI Component
import { Image } from '@rneui/themed';

// Firebase
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext';

export default function Main({navigation}) {
  const [reviewData, setReviewData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const {setReview, review} = React.useContext(ReviewContext);

  // DB Routes
  //> userReviewIndex
  //> DummyIndex
  const fetchReviewData = async() => {
    try {
      const userIndexReviewsRoute = ref(db, 'DummyIndex/');
      onValue(userIndexReviewsRoute, (snapshot) => {
        const data = snapshot.val();
        // console.log("The Review Count from DB:", data);

        let parsedData = [];

        // Retrieve data fields and parsing JSON object
        for (let key in data) {
          if (!data.hasOwnProperty(key)) continue;
          let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];

          parsedData.push(temp);

        }

        setReviewData(parsedData);
        // setLoading(false);

        setTimeout(() => {
          setLoading(false);
        }, 7000);
        
        // console.log("THE REACT STATE DATA: ", reviewData);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
  }

  // Render Reviews from DB
  React.useEffect(() => {
    // Fetch Review Data
    fetchReviewData();
  }, []);
  
  // Loading Wrapper
  if (isLoading) {
    return <LoadingScreen navigation={navigation} />
  } else {
    return (
      <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>
    
            <View style={styles.buttonContainer}>
            <Button title="See Loading Screen"
              onPress={() => navigation.navigate('LoadingScreen')}/>
    
              <Button title="Post product review"
              onPress={() => navigation.navigate('PostForm')}/>
            </View>
    
            <View style={styles.exploreContainer}>
              <FlatList data={reviewData.map((v) => v)}
                style={styles.list} numColumns={3} 
                keyExtractor={(e) => {
                  return e[0]}}
                renderItem={({ item }) => (
                  <Image 
                    source={{ uri: `${item[2]}` }}
                    containerStyle={styles.item}
                    PlaceholderContent={<ActivityIndicator />}
                    onPress={() => {
                      setReview(item[0]);
                      navigation.navigate('PostScreen');
                    }}
                  />
                )}
              />
            </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
      // display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    exploreContainer: {
      width: "100%",
      flex: 1
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
      // borderColor: 'red', 
      // borderWidth: 1
    },
    buttonContainer: {
      marginBottom: 20
    }
});

