import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, ActivityIndicator} from 'react-native';

// React Screen Components
import LoadingScreen from './LoadingScreen';

// UI Component
import { Image } from '@rneui/themed';
import { SearchBar } from '@rneui/themed';
import { Button } from "@rneui/themed";

// Image Caching

// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext';

export default function Main({navigation}) {
  const [reviewData, setReviewData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [querys, setQuery] = React.useState("");
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
        setLoading(false);

        // setTimeout(() => {
        //   setLoading(false);
        // }, 4000);
        
        // console.log("THE REACT STATE DATA: ", reviewData);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
  }

  const updateQuery = (search) => {
    setQuery(search);
    console.log(search);

    if (search == "") {
      fetchReviewData();
    } else {
      const tagPath = ref(db, 'TagReviews/');
      // const dbTagQuery = query(tagPath, orderByChild("tags"), startAt(`${querys.toLowerCase()}`), endAt(`${querys.toLowerCase()}` + "\uf7ff"));
      const dbTagQuery = query(tagPath, orderByChild("tags"));

      get( dbTagQuery ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          let parsedData = [];

          for (let key in data) {
            if (!data.hasOwnProperty(key)) continue;
            let temp = [data[key].review.userReviewID, data[key].review.title, data[key].review.imageURL];
            parsedData.push(temp);
          }

          setReviewData(parsedData);

        } else {
          console.log("The Snapshot doesn't exist!");
        }
      }).catch((error) => {
        console.error(error);
      });
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
            <View style={styles.buttonContainer}>
            {/* <Button title="See Loading Screen"
              onPress={() => navigation.navigate('LoadingScreen')}/> */}

              <SearchBar
                placeholder='Search'
                onChangeText={updateQuery}
                value={querys}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInput}
              />
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
    searchBarContainer: {
      width: 350,
      height: 50,
      borderRadius: 5,
    },
    searchBarInput: {
      height: 10
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

