import { StyleSheet, Text, View, ScrollView, StatusBar, Pressable} from 'react-native';
import ReviewContext from '../reviewSelectorContext'
import { dateFromNow } from './CommentsPage';
// React Native UI Elements Import
import { Avatar, withBadge } from '@rneui/themed';
import { Image } from '@rneui/themed';
import React, { useEffect, useRef } from 'react';
import uuid from 'react-native-uuid';
// React Native Paper
import { Chip } from 'react-native-paper';

// Lottie Animations
import Lottie from 'lottie-react-native';

interface CommentObject { 
    comment: string; 
    user: string; 
    time: string; 
    userImageURL: string; 
}

export interface ProductProperties { 
    heading: any; 
    user: any;
    link: string | undefined;
    imageLink: any; 
    description: any; 
    navigation: any;
    statistics: string[][];
    comments?;
    tags: any; 
    id: any;
}

const profilePicURIs = {'annaj1999':'https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg?width=256&s=fc15e67e2b431bbd2e93e980be3090306b78be55' , 'pastaluvr': 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg', 'bob123': 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}


export default function UserProductReviewPage(props: ProductProperties) {
    const {setReview, review} = React.useContext(ReviewContext);
    console.log(props.id)

    React.useEffect(() => {console.log("lol")}, [review])

    const animationRef1 = useRef<Lottie>(null);
    const animationRef2 = useRef<Lottie>(null);
    const animationRef3 = useRef<Lottie>(null);

      // tags: 

      function get_ascii(tag: string) { 
        let asciiVal = 0; 
        if (tag.length === 0) return asciiVal;
        for (let i = 0; i < tag.length; i++) { 
            asciiVal = asciiVal + tag.charCodeAt(i); 
        }
        return asciiVal; 
        }

    const tagColors = ["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]; 

    function getTagColor(tag: string) { 
        tag = tag[0]?.toUpperCase() + tag.slice(1).toLowerCase().replace('_',' ').replace('&','-'); 
        let index = Math.abs(get_ascii(tag)) % tagColors.length;
        return tagColors[index];
        }


  

    const src = {uri: props.imageLink}; 

    return (
        <ScrollView >
            {/* Title and User Info */}
            <View style={styles.headerContainer}>
                <View style={styles.profileContainer}>
                    <Avatar size={30} rounded source={{uri: profilePicURIs[props.user]}}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{props.heading}</Text>
                </View>
            </View>

            {/* Image Container */}
            <Image style={styles.image}source={src}/>

            {/* Chips and Tagging */}
            <View style={styles.chipContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    
                    {props.tags.map((v) => {
                    return(
                        <Chip style={{...styles.chip, backgroundColor: getTagColor(v)}} key={`${uuid.v4()}`} icon="information" onPress={() => console.log('Pressed')}>{v} </Chip>
                        
                    );
                }) }
                </ScrollView>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
            
                
                <Text style={styles.description}>
                    <Text style={styles.profileLink}>{`@${props.user}`} </Text>
                    {props.description}
                </Text>
            </View>

            {/* Comment Container */}
            {(props.comments.length > 0) && props.comments.map((v) => {
                    return(
                        <View style={styles.commentContainer}                     key={`${uuid.v4()}`}
                        >
                {/* Comment */}
                            <View style={styles.commentHeader}>
                                <Avatar size={24} rounded source={{uri: v.userImageURL}}/>
                                <Text style={styles.profilename}>{v.user}</Text>
                                <Text style={{color: "gray"}}> {dateFromNow(v.time)} </Text>
                            </View>
                            <View style={styles.commentDescription}>
                                <Text>
                                    {v.comment}
                                </Text>
                            </View>
                            
                        </View>
                    );
                }) }
            {/* <Text style={{color: "#808080", marginTop: 15, marginLeft:10}}>View comments</Text> */}
            <Pressable onPress={() => {
                setReview(props.id)
                console.log("Review context " + review);
                props.navigation.navigate('CommentsPage')}
                }>
                        <Text style={{color: "#808080", marginTop: 5, marginLeft: 10}}>View Comments</Text>
            </Pressable>

            <View style={{marginBottom: 10, marginTop:10}}></View>
            {/* <Button title="Go to Home" onPress={() => props.navigation.navigate('MainScreen')} />
            <Button title="Go back" onPress={() => props.navigation.goBack()} /> */}
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "white",
      flex: 1
    },
    statscontainer: {
        display: "flex",
        height: 90,
        maxWidth: "100%",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center"
    },
    statColumn: {
        display: "flex",
        flexDirection: "row",
    },
    miniBlock: {
        height: 100,
        width: 135
    },
    statTextBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    statsHeader: {
        fontSize: 12,
        fontWeight: "500",
        color: "gray"
    },
    statsInfo: {
        marginBottom: 10,
        fontSize: 11,
        fontWeight: "500"
    },

    headerContainer: {
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        paddingBottom: 5,
        marginBottom: 10,
        marginTop: 20
    },
    profileContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 10
    },
    profileLink: {
        fontSize: 15,
        fontWeight: "bold"
    },
    titleContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Title: {
        fontSize: 20,
        fontWeight: "900"
    },
    chipContainer: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginTop: 10,
        height: 30
    },
    chip: {
        marginRight: 2,
        marginLeft: 2
    },
    functionContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 80,
        maxWidth: "100%",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        // borderWidth: 1,
        // borderStyle: "dashed",
        // borderColor: "#33B3A6"
    },
    functionBtnContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    funcTitleShare: {
        marginLeft: 15,
        fontWeight: "600"
    },
    funcGeneric: {
        fontWeight: "600"
    },



    list: {
        width: "100%",
        backgroundColor: 'white',
        flex: 1
    },
    usertagline: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomWidth: 0.2,
        // borderTopWidth: 0.2,
        borderColor: "#A9A9A9"
    },
    heading: {
      fontSize: 30,
      marginLeft: 5,
      fontWeight: "bold",
      color: "black",
    },
    profilename: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginLeft: 10
    },
    leftIcons: {
        marginRight: 10,
        color: "black",
    },
    image: {
        width: "100%",
        height: 400,
      },
    gamificationContainer: {
        display: "flex",
        marginTop: 10,
        paddingTop: 7,
        flexDirection: "row",
        borderTopWidth: 0.2,
        borderColor: "#d3d3d3",
        marginLeft: 5,
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5
    },
    descriptionContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    description: {
        fontSize:14, 
    },
    commentContainer: {
        marginLeft: 10,
        marginTop: 20
    },
    commentHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }, 
    commentDescription: {
        marginBottom: 0,
        marginLeft: 35
    },
    commentTime: {
        marginTop: 2,
        marginLeft: 35
    }
  });