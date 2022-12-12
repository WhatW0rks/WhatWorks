import { StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';

// React Native UI Elements Import
import { Avatar, withBadge } from '@rneui/themed';
import { Image } from '@rneui/themed';
import React, { useEffect, useRef } from 'react';

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
    heading: string; 
    user: string;
    link: string | undefined;
    imageLink: string; 
    description: string; 
    navigation: any;
    statistics: string[][];
    comments: CommentObject[] ; 
    tags: string[]; 
}

const profilePicURIs = {'annaj1999':'https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg?width=256&s=fc15e67e2b431bbd2e93e980be3090306b78be55' , 'pastaluvr': 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg', 'bob123': 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}


export default function UserProductReviewPage(props: ProductProperties) {
    const animationRef1 = useRef<Lottie>(null);
    const animationRef2 = useRef<Lottie>(null);
    const animationRef3 = useRef<Lottie>(null);

    useEffect( () => {
        
    }, []);

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
                        <Chip style={styles.chip} key={v} icon="information" onPress={() => console.log('Pressed')}>{v} </Chip>
                        
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

            {/* Function Bar */}
            {/* <View style={styles.functionContainer}>
                <Pressable onPress={() => {animationRef1.current?.play();}} style={styles.functionBtnContainer}>
                    <Lottie style={{height: 35, width: 35}} ref={animationRef1} source={Share} loop={false}/>
                    <Text style={styles.funcTitleShare}>Share</Text>
                </Pressable>
                <Pressable onPress={() => {animationRef2.current?.play();}} style={styles.functionBtnContainer}>
                    <Lottie style={{height: 70, width: 70}} ref={animationRef2} source={Heart} loop={false}/>
                    <Text style={styles.funcGeneric}>Favorite</Text>
                </Pressable>
                <Pressable onPress={() => {animationRef3.current?.play();}} style={styles.functionBtnContainer}>
                    <Lottie style={{height: 70, width: 70}} ref={animationRef3} source={Like} loop={false}/>
                    <Text style={styles.funcGeneric}>Like</Text>
                </Pressable>
            </View> */}

            {/* Comment Container */}
            {props.comments.map((v) => {
                    return(
                        <View style={styles.commentContainer} key={v.comment}>
                {/* Comment */}
                            <View style={styles.commentHeader}>
                                <Avatar size={24} rounded source={{uri: v.userImageURL}}/>
                                <Text style={styles.profilename}>{v.user}</Text>
                                <Text style={{color: "gray"}}> {v.time} </Text>
                            </View>
                            <View style={styles.commentDescription}>
                                <Text>
                                    {v.comment}
                                </Text>
                            </View>
                            
                        </View>
                    );
                }) }
            <Text style={{color: "#808080", marginTop: 15, marginLeft:10}}>View comments</Text>

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