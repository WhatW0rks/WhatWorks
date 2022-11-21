import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initializeDisliked, initializeLiked, selectDisliked, selectLiked, selectUsername, switchUser } from '../userSlice';
import TriedReview from '../components/smallComponents/TriedReview'; 
import { useAppDispatch, useAppSelector } from '../hooks';
import { Avatar } from 'react-native-paper';
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";

// Firebase DB
const db = database;

// Redux test
// import { incremented, decremented, reset, store } from '../redux/counterExample/counter';

// export default function LoadingScreen({navigation}) {
//     const [count, setCount] = React.useState(null);
//     store.subscribe(() => {
//         let x = store.getState().value;
//         // console.log("The Value", x);
//         setCount(x);
//     });
//     return(
//         <SafeAreaView style={styles.loadingContainer}>
//             <Text> Profile Screen </Text>
//             <Text>{`${count}`}</Text>
//             <Button title='Increment' onPress={() => store.dispatch(incremented()) }></Button>
//             <Button title='Decrement' onPress={() => store.dispatch(decremented()) }></Button>
//             <Button title='Reset' onPress={() => store.dispatch(reset()) }></Button>
//         </SafeAreaView>
//     );
// }

export default function Profile({navigation}) {
    const dispatch = useAppDispatch(); 
    let username = useAppSelector(selectUsername); 
    let liked = useAppSelector(selectLiked);
    let disliked = useAppSelector(selectDisliked);

    let icon = ""

    const onPressSwitch = () => { 
        dispatch(switchUser());
    }


    const fetchReviewData = async() => {
        try {
            let url = 'UserTriedData/' + username + '/';
            const userIndexReviewsRoute = ref(db, url);
            onValue(userIndexReviewsRoute, (snapshot) => {
                const data = snapshot.val();   
                console.log("Just fetched!"); 

                // Retrieve data for a specific user 
                for (let key in data) {
                    if (!data.hasOwnProperty(key)) continue;
                    if (key == 'liked')  {
                        dispatch(initializeLiked(data[key]));

                    }
                    else if (key=='disliked') { 
                        dispatch(initializeDisliked(data[key])); 
                    }
                }
          });
    
        } catch (e) {
          console.log("Error: ", e)
        }
      }

      React.useEffect(() => {
        // Fetch Review Data
        fetchReviewData();
      }, [username]);

      return (
        <SafeAreaView style={styles.loadingContainer}>
            <ScrollView>
                <View style={styles.header}>
                {username === 'bob123' ? 
                (  <Avatar.Icon size={64} icon="dog" style={styles.avatar}/> )
                :
                (  <Avatar.Icon size={64} icon="duck" style={styles.avatar}/> )

                }
                <Text style={styles.title}>
                    {username}
                </Text>
                </View>
                {Object.keys(liked).length > 0 && 
                (
                    <Text style={styles.subheading}>
                        I liked...
                    </Text>
                )}
                {Object.keys(liked).map(id => <TriedReview key={id} title={liked[id].title} review={liked[id].review} tags={liked[id].tags} imageLink = {liked[id].imageURL}/>)}

                 {Object.keys(disliked).length > 0 && 
                (
                    <Text style={styles.subheading}>
                        I disliked...
                    </Text>

                )}
                {Object.keys(disliked).map(id => <TriedReview key={id} title={disliked[id].title} review={disliked[id].review} tags={disliked[id].tags} imageLink = {disliked[id].imageURL}/>)}
                <Button onPress={onPressSwitch} title="Switch user!"/>

           
            </ScrollView>
        </SafeAreaView>

      ); 

}
const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
    }, 
    avatar: { 
        margin: 20, 
    }, 
    title: { 
        fontSize: 24, 
        fontWeight: "400", 
        
    }, 
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    subheading: { 
        fontWeight:"300", 
        fontSize:18, 
        marginLeft:25, 
        marginBottom:10

    }
});