import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, StatusBar, Pressable } from 'react-native';

// React Native UI Elements Import
import { Image } from '@rneui/themed';
import React from 'react';

// React Native Paper
import { Chip } from 'react-native-paper';



interface ProductProperties { 
    title: string; 
    imageLink: string; 
    review: string; 
    tags: string; 
}


export default function TriedReview(props: ProductProperties) {

    var tags1 = props.tags.split(","); 
    var tags =tags1.map(function(tag) { 
        tag = tag.replace(/&|_/, " ");
        return tag;
      });    
    // console.log(props.tags);

    // const tags = ["happy", "sad"];

    const src = {uri: props.imageLink}; 

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Title and User Info */}
                <View style={styles.headerContainer}>
    
                    <View style={styles.titleContainer}>
                        <Text style={styles.Title}>{props.title}</Text>
                    </View>
                </View>

                {/* Image Container */}
                <Image style={styles.image}source={src}/>

                {/* Chips and Tagging */}
                <View style={styles.chipContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {tags.map(tag =>  <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>{tag}</Chip>)}
                    </ScrollView>
                </View>

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {props.review}
                    </Text>
                </View>

                <View style={{marginBottom: 10, marginTop:10}}></View>
              
            </ScrollView>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "white",
      flex: 1, 
      marginLeft: 15,
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
        marginLeft: 10,
        width: "70%"
    },
    profileContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    profileLink: {
        fontSize: 10,
        fontWeight: "bold"
    },
    titleContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Title: {
        fontSize: 20,
        fontWeight: "900",
        paddingBottom: 13
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
        height: 200, 
        width: 200,
        marginLeft: 10
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
    }
  });