import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Main({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
    <Text style={styles.Title}>Welcome to WeWork App Directory!</Text>
    <Button title="Cape Cod Potato Chips"
    onPress={() => navigation.navigate('Review1')}/>
    <Button title="Cape Cod Potato Chips Part 2"
    onPress={() => navigation.navigate('Review2')}/>
  </View>
);

}

const styles = StyleSheet.create({
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
});

