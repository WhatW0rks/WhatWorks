import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, ActivityIndicator} from 'react-native';
import CachedImage from '../components/smallComponents/CachedImage';
// React Screen Components
import LoadingScreen from './LoadingScreen';
// import CachedImage from 'react-native-expo-cached-image';

// UI Component
import { Image } from '@rneui/themed';
import { SearchBar } from '@rneui/themed';

// Image Caching

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
  const [isLoading, setLoading] = React.useState(true);
  const [querys, setQuery] = React.useState("");
  const {setReview, review} = React.useContext(ReviewContext);
  const {setLink, link} = React.useContext(ReviewContext);

  const {setTag, tag} = React.useContext(TagContext);
  
  const tagArrayReference = [
    "tag1","tag2","tag3","tag4","tag5",
    "tag5","tag6","tag7","tag8","tag9", "tag10"
  ];

  // DB Routes
  //> userReviewIndex
  //> DummyIndex
  const fetchReviewData = async() => {
    try {
      const userIndexReviewsRoute = ref(db, 'Index/');
      onValue(userIndexReviewsRoute, (snapshot) => {
        const data = snapshot.val();

        let parsedData = [];

        // Retrieve data fields and parsing JSON object
        for (let key in data) {
          if (!data.hasOwnProperty(key)) continue;
          let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];
          console.log(temp);
          
          parsedData.push(temp);

        }

        setReviewData(parsedData);
        setLoading(false);
      });

    } catch (e) {
      console.log("Error: ", e)
    }
  }

  const DBQuery = (dbQuery: Query) => {
    get(dbQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        let parsedData = [];

        for (let key in data) {
          if (!data.hasOwnProperty(key)) continue;
          let temp = [data[key].userReviewID, data[key].title, data[key].imageURL];
          parsedData.push(temp);
        }
        setReviewData(parsedData);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const updateQuery = (search: string) => {
    setQuery(search);
    let searchTerm = search.toLowerCase().replace(' ', '_').replace('-', '&');
    console.log(searchTerm);

    if (search == "") {
      fetchReviewData();
    } else {
      const tagPath = ref(db, 'TagReviews/');

      // Rows of DB Query's because firebase is not fun...
      tagArrayReference.forEach( (s)=> {
        const dbTagQuery = query(tagPath, orderByChild(`${s}`), startAt(`${searchTerm}`), endAt(`${searchTerm}` + "\uf7ff"));
        DBQuery(dbTagQuery);
      })
    }
    
  }

  function navigate() { 
   return (navigation.navigate('PostScreen'));
  }

  // Render Reviews from DB
  React.useEffect(() => {
    // Fetch Review Data
    fetchReviewData();
    if (tag !== "") updateQuery(tag[0]?.toUpperCase() + tag.slice(1).toLowerCase().replace('_',' ').replace('&','-'));
  }, [tag]);
  
  // Loading Wrapper
  if (isLoading) {
    return <LoadingScreen navigation={navigation} />
  } else {
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
              <FlatList data={reviewData.map((v) => v)}
                style={styles.list} numColumns={3} 
                keyExtractor={(e) => {
                  return e[0]}}
                renderItem={({ item }) => (
                  // <SmartCacheImage 
                  //   source={{ uri: `${item[2]}`, filename: item[0]}}
                  //   style={styles.item}
                  //   onPress={() => {
                  //     setReview(item[0]);
                  //     navigation.navigate('PostScreen');
                  //   }}
                  // />
                  <CachedImage
                  source={{uri: `${item[2]}`}}
                  containerStyle={styles.item}
                  PlaceholderContent={<ActivityIndicator />}
                  id = {item[0]}
                  function = {
                    navigate
                  }
                  // onPress={() => {
                  //   setReview(item[0]);
                  //   navigation.navigate('PostScreen');
                  // }}
                
                  />
                  // <Image 
                  //   source={{ uri: `${item[2]r}` }}
                  //   containerStyle={styles.item}
                  //   PlaceholderContent={<ActivityIndicator />}
                  //   onPress={() => {
                  //     setReview(item[0]);
                  //     navigation.navigate('PostScreen');
                  //   }}
                  // />
                  

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

