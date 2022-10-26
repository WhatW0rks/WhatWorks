import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, AsyncStorage, ScrollView } from 'react-native';
import { Button } from "@rneui/themed";
import ContextCount from '../countContext';
import ReviewContext from '../reviewSelectorContext';

export default function Main({navigation}) {
    // access the context value
    const {setCount, count} = React.useContext(ContextCount);
    const {setReview, review} = React.useContext(ReviewContext);

    const [reviews, addReviews] = React.useState([]);

    // const fetchTitles = async () => {
    //     let parsedTitles = []

    //     reviews.map(async (v) => {
    //         await AsyncStorage.getItem(`${v}`).then((data) => {
    //             let parsedData = JSON.parse(data);
    //             // console.log("THE PARSED DATA: ", parsedData);
    //             parsedData.push(parsedData.title);

    //         });
    //     })
    //     console.log("THE PARSED TITLES:")
    //     setReview(parsedTitles);
        
    // }

    // Render "x" amount of reviews
    React.useEffect(() => {
        addReviews([...Array(count).keys()]);
        console.log("HERE ARE THE USE EFFECT REVIEWS: ", reviews);
        // fetchTitles();
    }, [count]);

  return (
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
    {/* <ScrollView> */}
    
      <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>
      {/* <Button title="Cape Cod Potato Chips" type='clear'
      onPress={() => navigation.navigate('Review1')}/> */}

      {/* <Button title="Cape Cod Potato Chips" type='clear'
      onPress={() => navigation.navigate('Review2')}/> */}

      <Button title="Cape Cod Potato Chips" type='clear'
      onPress={() => navigation.navigate('Review1')}/>

    {reviews.map((r) => {
        return (
          <Button type='clear'
          onPress={() => {
            setReview(r);
            navigation.navigate('Review2')}}
          >{`Review ${r + 1}`}</Button>
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

