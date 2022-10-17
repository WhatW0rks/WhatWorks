import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, Image } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { chips } from '../assets';

export default function Review1({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.Title} >Cape Cod Chips</Text>
      </View>
      <View>
        <Card containerStyle={styles.cardContainer}>
            <Card.Title>Review by Allison</Card.Title>
                <View style={{display: "flex", alignContent:"center", justifyContent:"center"}}>
                  <Image
                    style={styles.picture}
                    resizeMode="cover"
                    source={chips}
                  />
                </View>
        </Card>
        <View style={{width: 300, marginTop: 30, marginLeft: 20}}>
          <Text style={{fontSize: 15}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur."</Text>
        </View>
      </View>
      <View style={{marginBottom: 10, marginTop:150}}></View>
      <Button title="Go to Home" onPress={() => navigation.navigate('MainScreen')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: "white"
  },
  picture: {
    width: 200,
    height: 200,
    marginLeft: 30
  },
  cardContainer: {
    borderRadius: 10,
    width: 300
  }
});