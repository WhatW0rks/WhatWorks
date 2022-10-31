import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, AsyncStorage, ScrollView } from 'react-native';
import { Button } from "@rneui/themed";
// Firebase
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext';

export default function Main({navigation}) {
  const [reviewData, setReviewData] = React.useState([]);
  const {setReview, review} = React.useContext(ReviewContext);

  const fetchReviewData = async() => {
    try {
      const userIndexReviewsRoute = ref(db, 'userCreatedReviews/');
      onValue(userIndexReviewsRoute, (snapshot) => {
        const data = snapshot.val();
        console.log("The Review Count from DB:", data);

        let parsedData = [];

        // Retrieve data fields and parsing JSON object
        for (let key in data) {
          if (!data.hasOwnProperty(key)) continue;

          let temp = [key, data[key].title];

          parsedData.push(temp);

        }

        setReviewData(old => (parsedData));
        console.log("THE REACT STATE DATA: ", reviewData);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
    
  }

    // Render Reviews from DB
    React.useEffect(() => {
      fetchReviewData();
      //console.log(reviewData);
    }, []);

  return (
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
    {/* <ScrollView> */}
    
      <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>

    {reviewData.map((r) => {
        let id = r[0];
        let title = r[1];
        console.log(id);
        console.log(title);

        return (
          <Button key={id} type='clear'
          onPress={() => {
            setReview(id);
            navigation.navigate('PostScreen');
          }}
          >{`${title}`}</Button>
        );
      })}

      <Button title="Post product review"
      onPress={() => navigation.navigate('Post form')}/>
      {/* </ScrollView> */}
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
});

