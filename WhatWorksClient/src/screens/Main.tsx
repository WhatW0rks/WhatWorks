import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button } from 'react-native';

export default function Main({navigation}) {
  return (
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
    <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>
    <Button title="Cape Cod Potato Chips"
    onPress={() => navigation.navigate('Review1')}/>
    <Button title="Cape Cod Potato Chips Part 2"
    onPress={() => navigation.navigate('Review2')}/>
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

