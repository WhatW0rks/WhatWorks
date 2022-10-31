import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, View, FlatList, ActivityIndicator} from 'react-native';
import { Button } from "@rneui/themed";

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
        // console.log("THE REACT STATE DATA: ", reviewData);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
    
  }

    // Render Reviews from DB
    React.useEffect(() => {
      fetchReviewData();
    }, []);

  return (
  <SafeAreaView>
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.Title}>Welcome to WhatWorks App Directory!</Text>
        <View>
          <Button title="Post product review"
          onPress={() => navigation.navigate('Post form')}/>
        </View>
            {/* {reviewData.map((r) => {
                let id = r[0];
                let title = r[1];
                let image = {uri: `${r[2]}`}; 
                
                return (
                  <Image key={id} source={image}/>
                  // <Button key={id} type='clear'
                  // onPress={() => {
                  //   setReview(id);
                  //   navigation.navigate('PostScreen');
                  // }}
                  // >
                  //   {`${title}`}
                  // </Button>
                );
              })} */}
            <FlatList data={reviewData.map((v) => v)}
              style={styles.list} numColumns={2} 
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
    </ScrollView>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    mainContainer: {
      // display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    }
});

