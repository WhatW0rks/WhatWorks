import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, ActivityIndicator} from 'react-native';

// React Screen Components
import LoadingScreen from './LoadingScreen';

// UI Component
import { Image } from '@rneui/themed';
import { SearchBar } from '@rneui/themed';

// Image Caching
import CachedImage from '../components/smallComponents/CachedImage';
// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query } from "firebase/database";

// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext';
import TagContext from '../tagSelectorContext';

export default function Main({navigation}) {
  const [reviewData, setReviewData] = React.useState([]);
  const [querys, setQuery] = React.useState("");
  const {setReview, review} = React.useContext(ReviewContext);
  const {setTag, tag} = React.useContext(TagContext);
  
  const tagArrayReference = [
    "tag1","tag2","tag3","tag4","tag5",
    "tag5","tag6","tag7","tag8","tag9", "tag10"
  ];

  const fetchReviewData = async() => {
    console.log("fetchReviewData");
    try {
      const userIndexReviewsRoute = ref(db, 'Index/');
      onValue(userIndexReviewsRoute, (snapshot) => {
        const data = snapshot.val();

        let parsedData = [];

        // Retrieve data fields and parsing JSON object
        for (let key in data) {
          if (!data.hasOwnProperty(key)) continue;
          let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];
          
          parsedData.push(temp);

        }

        setReviewData(parsedData);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
  }

  // const DBQuery = (dbQuery: Query) => {
  //   get(dbQuery).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
        

  //       let parsedData = [];

  //       for (let key in data) {
  //         if (!data.hasOwnProperty(key)) continue;
  //         let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];
  //         parsedData.push(temp);
  //       }
  //       console.log("Review data in DBQuery: ", reviewData);
  //       setReviewData(parsedData.concat(reviewData));
  //       console.log(reviewData);
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }

  const newDBQuery = (search: string) => { 
    console.log("newDBQuery");

    let parsedData = []; 
    const tagPath = ref(db, 'TagReviews/');
    for (let i = 0; i < 10; i++) {

      const dbTagQuery = query(tagPath, orderByChild(tagArrayReference[i]), startAt(search), endAt(`${search}` + "\uf7ff")); 
      get(dbTagQuery).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              
              for (let key in data) {
                if (!data.hasOwnProperty(key)) continue;
                let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];
                parsedData.push(temp);
              }
             
            }
            setReviewData(a => {
              const newstate = parsedData.slice(); 
              return newstate
            });
            console.log("Review data in DBQuery: ", reviewData);
          }).catch((error) => {
            console.error(error);
          });

    }
    
  }

  const updateQuery = (search: string) => {
    console.log("updateQuery");
    setQuery(prev => search);
    setReviewData(prev => []);

    let searchTerm = search.toLowerCase().replace(' ', '_').replace('-', '&');
    console.log(searchTerm);

    
    

    if (search == "") {
      fetchReviewData();
    } else {
      const tagPath = ref(db, 'TagReviews/');

      // Rows of DB Query's because firebase is not fun...
      // tagArrayReference.forEach( (s)=> {
      //   const dbTagQuery = query(tagPath, orderByChild(`${s}`), startAt(`${searchTerm}`), endAt(`${searchTerm}` + "\uf7ff"));
      //   console.log("Querying db...");
      //   DBQuery(dbTagQuery);
      // })
      newDBQuery(searchTerm);
    
    }

    
  }

  // Render Reviews from DB
  React.useEffect(() => {
    console.log("Use effect");
    // Fetch Review Data
    fetchReviewData();
    if (tag !== "") updateQuery(tag[0]?.toUpperCase() + tag.slice(1).toLowerCase().replace('_',' ').replace('&','-'));
  }, [tag]);
  console.log("Querys: " + querys);


  console.log("Reviewdata: " + reviewData);

    return (
      <SafeAreaView style={styles.mainContainer}>
            <View style={styles.buttonContainer}>

              <SearchBar
                platform='ios'
                placeholder='Search'
                onChangeText={updateQuery}
                value={querys}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInput}
              />
            </View>
    
            <View style={styles.exploreContainer}>
              <FlatList data={reviewData}
                style={styles.list} numColumns={3} 
                keyExtractor={(e) => {
                  return e[0]}}
                renderItem={({ item }) => (

                  // <Image 
                  //   source={{ uri: `${item[2]}` }}
                  //   containerStyle={styles.item}
                  //   PlaceholderContent={<ActivityIndicator />}
                  //   onPress={() => {
                  //     setReview(item[0]);
                  //     navigation.navigate('PostScreen');
                  //   }}
                  // />
                  <CachedImage
                    source={{ uri: `${item[2]}` }}
                    containerStyle={styles.item}
                    id={item[0]}
                    navigation={navigation}
                  />
                )}
              />
            </View>
      </SafeAreaView>
    );
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

