import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Pressable } from 'react-native';

// React Native UI Elements Import
import { Avatar, withBadge } from '@rneui/themed';
import { Image } from '@rneui/themed';
import React, { useEffect, useRef } from 'react';

// React Native Paper
import { Chip } from 'react-native-paper';

// Lottie Animations
import Lottie from 'lottie-react-native';
import Heart from '../assets/LottieAnimations/heart.json';
import List from '../assets/LottieAnimations/toDo.json';
import Dislike from '../assets/LottieAnimations/dislike.json';

// React Contexts
import TagContext from '../tagSelectorContext';

interface ProductProperties { 
    id: number,
    heading: string; 
    user: string;
    tags: string;
    link: string | undefined;
    imageLink: string; 
    description: string; 
    navigation: any;
    statistics: string[][];
}


export default function UserProductReviewPage(props: ProductProperties) {
    const [statsData, setStatsData] = React.useState([
    ["Overall Rating", "5/10", "Sugar", "500mg"], 
    ["Calories", "180 cal", "Fat", "20mg"], 
    ["Carbs", "270g", "Protein", "30mg"]]);
    const [tagsData, setTagsData] = React.useState([""]);
    const animationRef1 = useRef<Lottie>(null);
    const animationRef2 = useRef<Lottie>(null);
    const animationRef3 = useRef<Lottie>(null);

    const {setTag, tag} = React.useContext(TagContext);
    

    useEffect( () => {
        if (props.tags !== undefined) {
            setTagsData(props.tags.split(','));
        }
    }, [props.tags]);

    const src = {uri: props.imageLink}; 

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Image Container */}
                <Image style={styles.image}source={src}/>

                {/* Stats Container */}
                <View style={styles.statscontainer}>
                    <View style={styles.statColumn}>
                            {statsData.map((v) => {
                                return(
                                <View key={props.id + v[0]} style={styles.miniBlock}>
                                    <View style={styles.statTextBox}>
                                        <Text style={styles.statsHeader}>{v[0]}</Text>
                                        <Text style={styles.statsInfo}>{v[1]}</Text>
                                    </View>
                                    <View style={styles.statTextBox}>
                                        <Text style={styles.statsHeader}>{v[2]}</Text>
                                        <Text style={styles.statsInfo}>{v[3]}</Text>
                                    </View>
                                </View>
                                )
                            })}
                    </View>
                </View>

                {/* Title and User Info */}
                <View style={styles.headerContainer}>
                    <View style={styles.profileContainer}>
                        <Avatar size={40} rounded source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}/>
                        <Text style={styles.profileLink}>@JaneDoe</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.Title}>{props.heading}</Text>
                    </View>
                </View>

                {/* Chips and Tagging */}
                <View style={styles.chipContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {tagsData?.map( (v) => {
                            if (v !== undefined) {
                                return(<Chip style={styles.chip} key={props.id + v} icon="information" onPress={() => {
                                    setTag(v);
                                    props.navigation.navigate('MainScreen');
                                }}>{v[0]?.toUpperCase() + v.slice(1).toLowerCase().replace('_',' ').replace('&','-')}</Chip>);
                            } else {
                                return(<Chip style={styles.chip} key={props.id + v} icon="information" onPress={() => console.log('Pressed')}>Loading Tags...</Chip>);
                            }
                        })}
                    </ScrollView>
                </View>

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {props.description}
                    </Text>
                </View>

                {/* Function Bar */}
                <View style={styles.functionContainer}>
                    <Pressable onPress={() => {animationRef1.current?.play();}} style={styles.functionBtnContainer}>
                        <Lottie style={{height: 44, width: 44}} ref={animationRef1} source={Dislike} loop={false}/>
                        <Text style={styles.funcTitleShare}>Didn't Work!</Text>
                    </Pressable>
                    <Pressable onPress={() => {animationRef2.current?.play();}} style={styles.functionBtnContainer}>
                        <Lottie style={{height: 50, width: 50}} ref={animationRef2} source={List} loop={false}/>
                        <Text style={styles.funcGeneric}>Going to try!</Text>
                    </Pressable>
                    <Pressable onPress={() => {animationRef3.current?.play();}} style={styles.functionBtnContainerWorks}>
                        <Lottie style={{height: 70, width: 70}} ref={animationRef3} source={Heart} loop={false}/>
                        <Text style={styles.funcTitleShare2}>Works!</Text>
                    </Pressable>
                </View>

                {/* Comment Title */}
                <View style={styles.CommentTitleContainer}>
                    <Text style={styles.CommentTitle}>Top Comments</Text>
                </View>

                {/* Comment Container */}
                <View style={styles.commentContainer}>
                    {/* Comment */}
                    <View style={styles.commentHeader}>
                        <Avatar size={24} rounded source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}/>
                        <Text style={styles.profilename}>{props.user}</Text>
                        <Text style={{color: "gray"}}> 59 minutes </Text>
                    </View>
                    <View style={styles.commentDescription}>
                        <Text>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam."   
                        </Text>
                    </View>

                    {/* Comment */}
                    <View style={styles.commentHeader}>
                        <Avatar size={24} rounded source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}/>
                        <Text style={styles.profilename}>{props.user}</Text>
                        <Text style={{color: "gray"}}> 1 day ago </Text>
                    </View>
                    <View style={styles.commentDescription}>
                        <Text>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam."   
                        </Text>
                    </View>
                    
                    <Text style={{color: "#808080", marginTop: 15}}>View 1000 Comments</Text>
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
    functionBtnContainerWorks: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: -7
    },
    funcTitleShare: {
        fontWeight: "600",
        marginRight: 5
    },
    funcTitleShare2: {
        fontWeight: "600",
        marginLeft: -15,
        marginRight: 10
    },
    funcGeneric: {
        fontWeight: "600"
    },
    CommentTitleContainer: {
        display: "flex",
        marginLeft: 5,
        marginTop: 10,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    CommentTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline"
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
        marginBottom: 10,
        marginLeft: 35
    },
    commentTime: {
        marginTop: 2,
        marginLeft: 35
    }
  });

