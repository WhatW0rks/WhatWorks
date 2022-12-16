import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';

// UUID Unique Key
import uuid from 'react-native-uuid';

// UI Component
import { SearchBar } from '@rneui/themed';

// Image Caching
import CachedImage from '../components/smallComponents/CachedImage';
// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query, orderByValue } from "firebase/database";

//TAGS
import { MasterTagList } from '../assets/tags/tags'
// Firebase DB
const db = database;

// React Contexts
import ReviewContext from '../reviewSelectorContext';
import TagContext from '../tagSelectorContext';
import { Chip } from 'react-native-paper';

export default function Main({navigation}) {
  const [reviewData, setReviewData] = React.useState([]);
  const [querys, setQuery] = React.useState("");
  const {setReview, review} = React.useContext(ReviewContext);
  const {setTag, tag} = React.useContext(TagContext);
  // const [tagsData, setTagsData] = React.useState(["non&fat",
  // 'for_kids', 'family_friendly', 'low_fat', "citrus_feed"]);
  const [tagsData, setTagsData] = React.useState(MasterTagList);
  
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

  // Refresh Handler
  const [refreshing, setRefreshing] = React.useState(false);

  // OnRefresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // Fetch Review Data
    fetchReviewData();

    setTimeout( () => {
        setRefreshing(false); 
    }, 3000);
  }, []);

  const newDBQuery = async (search: string) => {

    let parsedData = {}; 
    const tagPath = ref(db, 'TagReviews/');
    let searchTerm = search.toLowerCase().replace(' ', '_').replace('-', '&');

    for (let i = 0; i < 10; i++) {
      const dbTagQuery = query(tagPath, orderByChild(tagArrayReference[i]), startAt(searchTerm), endAt(`${searchTerm}` + "\uf7ff")); 
      await get(dbTagQuery).then((snapshot) => {

            if (snapshot.exists()) {
              const data = snapshot.val();
              
              for (let key in data) {
                
                if (!data.hasOwnProperty(key)) continue;
                if (parsedData[data[key].userReviewID] === undefined)  {
                  parsedData[data[key].userReviewID] = [data[key].userReviewID, data[key].title, data[key].imageURL]; 
                }   
              }   
            }
            (error) => {
            console.error(error);
          }});

    }

    const titlePath = ref(db, 'Index/');
    const titleTagQuery = query(titlePath, orderByChild('title'), startAt(search), endAt(`${search}` + "\uf7ff")); 

    await get(titleTagQuery).then((snapshot) => {

      if (snapshot.exists()) {
        const data = snapshot.val();
        
        for (let key in data) {
          
          if (!data.hasOwnProperty(key)) continue;
          if (parsedData[data[key].userReviewID] === undefined) {
            parsedData[data[key].userReviewID] = [data[key].userReviewID, data[key].title, data[key].imageURL];
          }
        }
      }
      (error) => {
      console.error(error);
    }});

    setReviewData((a) => 
     {console.log(parsedData);
      return [...Object.values(parsedData)];
    })

  }

  const updateQuery = (search: string) => {
    setQuery(prev => search);
    // setReviewData(prev => []);

    if (/^\s*$/.test(search)) {
      fetchReviewData();
    } else {
      const tagPath = ref(db, 'TagReviews/');

      // Rows of DB Query's because firebase is not fun...
      // tagArrayReference.forEach( (s)=> {
      //   const dbTagQuery = query(tagPath, orderByChild(`${s}`), startAt(`${searchTerm}`), endAt(`${searchTerm}` + "\uf7ff"));
      //   console.log("Querying db...");
      //   DBQuery(dbTagQuery);
      // })
      newDBQuery(search);
    
    }

    
  }

  // Render Reviews from DB
  React.useEffect(() => {

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

            {/* Chip Row */}
            <View style={styles.chipContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {tagsData?.map( (v) => {
                      return(<Chip style={styles.chip} key={`${uuid.v4()}`} onPress={() => {
                        setTag(v.value)
                      }}>{v.label}</Chip>);
                    })}
                </ScrollView>
            </View>
    
            <View style={styles.exploreContainer}>
             {( reviewData.length > 0) ?
              <FlatList data={reviewData}
                refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                  />
                }
                style={styles.list} 
                numColumns={3} 
                keyExtractor={(e) => {
                  return e[0]}}
                renderItem={({ item }) => (
                  <CachedImage
                    source={{ uri: `${item[2]}` }}
                    containerStyle={styles.item}
                    id={item[0]}
                    navigation={navigation}
                  />
              )}
              />
              :<Text style={styles.emptysearch}>We couldn't find any posts matching your search. Try searching for something else!</Text>}
           
            </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    },
    chipContainer: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 5,
      marginBottom: 10,
      height: 30
    },
    chip: {
      marginRight: 2,
      marginLeft: 2
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
      flex: 1
    },
    buttonContainer: {
      marginBottom: 5
    }, 
    emptysearch: { 
      marginLeft: 20, 
      marginTop: 15, 
      marginRight: 8,
      fontSize: 15, 
      lineHeight:25, 
      color: 'gray',
    }
});

