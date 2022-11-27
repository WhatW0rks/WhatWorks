import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

// Firebase
import { database } from '../firebase';
import { onValue, ref, query, orderByChild, startAt, endAt, get, Query } from "firebase/database";

// Firebase DB
const db = database;

// UI
import { Image } from '@rneui/themed';


export default function OtherScreen({navigation}) {
    const [reviewData, setReviewData] = React.useState([]);

    let username = useAppSelector(selectUsername); 

    React.useEffect(() => {
      // Fetch Review Data
      // if (tag !== "") updateQuery(tag[0]?.toUpperCase() + tag.slice(1).toLowerCase().replace('_',' ').replace('&','-'));
    }, [username]);

    return(
        <SafeAreaView style={styles.loadingContainer}>
          <View>
            <Text>Other!</Text>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
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
    exploreContainer: {
        width: "100%",
        flex: 1
    },
});