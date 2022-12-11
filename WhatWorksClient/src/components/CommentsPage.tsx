import * as React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, View, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';

import { useState } from 'react';
// import { createComment, getComments } from '../comments/api';
import CommentPreview from './CommentPreview';
import CommentItem from './CommentItem';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'react-native-paper';

//Firebase Database
import { database } from '../firebase';
import { get, onValue, ref, set } from 'firebase/database';
import { selectUsername } from '../userSlice';
import { useAppSelector } from '../hooks';
import ReviewContext from '../reviewSelectorContext';
import { Avatar } from '@rneui/themed';

const db = database;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function dateFromNow(date: string) { 
    // input a date and get out how much time from now it's been
    let dateObject = new Date(date); 
    let secondsDelta = Math.floor((new Date().getTime() - dateObject.getTime())/1000); 
    var interval = secondsDelta / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = secondsDelta / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = secondsDelta / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = secondsDelta / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = secondsDelta / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(secondsDelta) + " seconds ago";

}


interface CommentPageProps {
    comment : { 
        id: string,
        body: string,
        username: string,
        userId: string,
        parentId: string | null,
        createdAt: string,
        uri: string
    },
    addComment: (value: string)=> void
}

export default function CommentsPage(props: CommentPageProps) {
    const [myComment, setMyComment] = useState("");
    const [commentData, setCommentData] = useState([]);

    let username = useAppSelector(selectUsername); 
    const {setReview, review} = React.useContext(ReviewContext);

    const FetchCommentData = async () => {
        try {
            const userCommentRef = ref(db, 'ReviewCommentData/' + review);
            onValue(userCommentRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let parsedData = [];
    
                    console.log("The data: " + JSON.stringify(data));
                    // iterate through all comments for this particular review! 
                    for (let comment in data) {
                        console.log("A comment: " + JSON.stringify(data[comment])); 
                        data[comment]['Dates'] = dateFromNow(data[comment]['Dates'])
                        parsedData.push(data[comment]); 
                    }
                    setCommentData(parsedData);

                    // Retrieve data fields and parsing JSON object
                    // Clean Comments
                    // let comments = data.Comments.split('!');
                    // comments = comments.filter(function(x){
                    //     return x !== ""
                    // });
                    // // Clean Users
                    // let users = data.Username.split('!');
                    // users = users.filter(function(x){
                    //     return x !== ""
                    // });

                    // // Clean Dates
                    // let dates = data.Dates.split('!');
                    // dates = dates.filter(function(x){
                    //     return x !== ""
                    // });

                    // for (let i = 0; i < comments.length; i++) {
                    //     let temp = [data.ReviewID, comments[i], users[i], data.UserImageURL, dates[i]];
                    //     parsedData.push(temp);
                    // }

                    // // console.log("THE COMMENTS ARRAY: ", comments);
                    // // console.log("THE USER ARRAY: ", users);
                    // setCommentData(parsedData);
                }
            });
      
          } catch (e) {
            console.log("Error: ", e)
          }
    };

    const WriteComment = () => {
        if (myComment != "") {
            // const commentRef = 'ReviewCommentData/' + username + '/' + 'Comments/' + review;

            // get(ref(db, commentRef)).then((snapshot) => {
            //     if (snapshot.exists()) {
            //         // Write Existing Comments Data
            //         let data = snapshot.val()
            //         let comments = data.Comments;
            //         let user = data.Username;
            //         let dates = data.Dates;
                    
            //         console.log("The Comments in the writing: ", comments);

            //         set(ref(db, 'UserCommentData/' + username + '/' + 'Comments/' + review), {
            //             ReviewID: `${review}`,
            //             Comments: `${comments}!${myComment}`,
            //             Username: `${user}!${username}`,
            //             UserImageURL: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            //             Dates: `${dates}!${new Date()}`
            //         });
            //         setMyComment("");
            //     } else {
            //         // Write New Comments Data
            //         set(ref(db, 'UserCommentData/' + username + '/' + 'Comments/' + review), {
            //             ReviewID: `${review}`,
            //             Comments: `!${myComment}`,
            //             Username: `!${username}`,
            //             UserImageURL: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            //             Dates: `!${new Date()}`
            //         });
            //         setMyComment("");
            //     }
            
            //   }).catch((error) => {
            //     console.error(error);
            //   });
            let randomCommentID = randomIntFromInterval(0,10000);


            set(ref(db, 'ReviewCommentData/' + review + '/' + randomCommentID), {
                            Comments: `${myComment}`,
                            Username: `${username}`,
                            UserImageURL: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                            Dates: `${new Date()}`
            });
            setMyComment("");
           
    }
    }

    const textChange = (value) => {
        setMyComment(value)
    }

    React.useEffect(() => {
        FetchCommentData();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView>
                <View style={styles.commentContainer}>
                    {commentData?.map((v) => {
                        return(
                            <View style={styles.containerComment} key={v['Dates']}> 
                                <View style={styles.commentHeader}>
                                    <Avatar size={24} rounded source={{uri: v['UserImageURL']}}/>
                                    <Text style={styles.profilename}>{v['Username']}</Text>
                                    <Text style={{color: "gray", marginLeft: 10}}>{v['Dates']}</Text>
                                </View>
                                <View style={styles.commentDescription}>
                                <Text>
                                    {v['Comments']}  
                                </Text>
                                </View>  
                            </View>
                        );
                    }) }
                </View>
                <View style={{display: "flex", flexDirection: "row", marginRight: 25, height: 55}}>
                    <TextInput
                        style={{marginLeft: 10, width: "80%", height: 50}}
                        label="Comment"
                        multiline={true}
                        value={myComment}
                        onChangeText={(t) => textChange(t)}
                        autoCapitalize="none"
                    />
                    <Button icon="send" 
                    mode="contained" 
                    onPress={() => {
                        WriteComment();
                        console.log("Clicked!")
                    }} 
                    style={{marginLeft: 10, flex: 1, marginRight:10}}
                    contentStyle={{width: 80, height:57}}
                    >
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    ); 
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'gray',
        maxWidth: 96,
      },
    image: { 
        height: 200, 
        width: 200, 
        padding: 10, 
        left: 50
    }, 
    heading: {
        fontSize: 30,
        marginLeft: 5,
        fontWeight: "bold",
        color: "black",
        paddingBottom: 5, 
        paddingTop: 5,
    },
    heading2: { 
        fontSize: 18, 
        marginLeft: 5, 
        fontWeight: "bold", 
        color: "#42b0f5"
    },    
    commentContainer: {
        marginLeft: 10,
        marginTop: 20, 
    },
    text: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black'
      },

    containerComment: {
    marginBottom:16
    },
    commentHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}, 
commentDescription: {
    marginBottom: 10,
    marginLeft: 35
},
profilename: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10
},
      

    container: {
        flex: 1
    },
      inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
      },
      header: {
        fontSize: 36,
        marginBottom: 48
      },
      textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginTop: 100
      },
      btnContainer: {
        backgroundColor: "white",
        marginTop: 12
      }
  });
