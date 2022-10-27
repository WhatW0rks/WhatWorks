import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, AsyncStorage, ScrollView } from 'react-native';
import { Button } from "@rneui/themed";

export default function Main({navigation}) {

    // Render "x" amount of reviews
    React.useEffect(() => {
    }, []);

  return (
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
    {/* <ScrollView> */}
    
      <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>
      {/* <Button title="Cape Cod Potato Chips" type='clear'
      onPress={() => navigation.navigate('Review1')}/> */}

      {/* <Button title="Cape Cod Potato Chips" type='clear'
      onPress={() => navigation.navigate('Review2')}/> */}

    {/* {reviews.map((r) => {
        return (
          <Button type='clear'
          onPress={() => {
            setReview(r);
            navigation.navigate('Review2')}}
          >{`Review ${r + 1}`}</Button>
        );
      })} */}

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

