import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, StatusBar, TextInput } from 'react-native';

// React Native UI Elements Import
import { Avatar } from '@rneui/themed';
import { Image } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { useState } from 'react';
import { createComment, getComments } from '../comments/api';
import CommentItem from './CommentItem';
import React from 'react';

interface ProductProperties { 
    heading: string; 
    user: string;
    link: string | undefined;
    imageLink:string; 
    description: string; 
    navigation: any;
}




export default function UserProductReviewPage(props: ProductProperties) {
    const [myComment, setMyComment] = useState("");
    const [comments, setComments] = useState(getComments());

    const src = {uri: props.imageLink}; 

    const addComment = (value: string)=>{
        setComments(prev => [...prev, createComment(value)])
        setMyComment("")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header Container */}
                <View style={styles.usercontainer}>
                    <View style={styles.usertagline}>
                        <Avatar size={32} rounded source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}/>
                        <Text style={styles.profilename}>{props.user}</Text>
                        <View style={{flex: 1}}></View>
                        <Icon name="menu" style={styles.leftIcons}/>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{props.heading}</Text>
                    </View>
                </View>

                {/* Image Container */}
                <Image style={styles.image}source={src}/>

                {/* Gamification */}
                <View style={styles.gamificationContainer}>
                    {/* Left Side */}
                    <Icon name="favorite" size={27} style={styles.leftIcons} />
                    <Icon name="forum" size={27} style={styles.leftIcons} />
                    <Icon name="send" size={27} style={styles.leftIcons} />

                    <View style={{flex: 1}}></View>

                    {/* Right Side */}
                    <Icon name="bookmark" size={27} style={styles.leftIcons} />
                </View>

                {/* Tags */}
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {props.description}
                    </Text>
                </View>
                {/* Comment Container */}
                <View style={styles.commentContainer}>
                {/* Comment */}
                {comments.map((comment, index) => <CommentItem comment={comment} addComment={addComment} key={index}/>) }
         </View>

                <View style={{marginBottom: 10, marginTop:10}}></View>
                {/* <Button title="Go to Home" onPress={() => props.navigation.navigate('MainScreen')} />
                <Button title="Go back" onPress={() => props.navigation.goBack()} /> */}
            </ScrollView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "white",
      flex: 1
    },
    usercontainer: {
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
    headerContainer: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10
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
        marginBottom: 10,
        marginLeft: 35
    },
    commentTime: {
        marginTop: 2,
        marginLeft: 35
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
  });

