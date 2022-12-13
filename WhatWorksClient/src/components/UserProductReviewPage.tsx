import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Pressable, TouchableOpacity } from 'react-native';

// React Native UI Elements Import
import { Avatar } from '@rneui/themed';
import { Image } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';

// React Native Paper
import { Chip, Button } from 'react-native-paper';

// React Popover UI
import Popover, { PopoverPlacement } from 'react-native-popover-view';

// Lottie Animations
import Lottie from 'lottie-react-native';
import Heart from '../assets/LottieAnimations/heart.json';
import Dislike from '../assets/LottieAnimations/dislike.json';
import Bookmark from '../assets/LottieAnimations/bookmark.json';
import Tokens from '../assets/LottieAnimations/tokens.json'
import Sad from '../assets/LottieAnimations/sad.json'

// React Contexts
import TagContext from '../tagSelectorContext';

// Redux
import { selectUsername } from '../userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

// UUID Unique Key
import uuid from 'react-native-uuid';

//Firebase
import { database } from '../firebase';
import { child, get, onValue, ref, set } from "firebase/database";
import { dateFromNow } from './CommentsPage';
const db = database;

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

    // Function Bar States
    const [OnTrying, setOnTrying] = React.useState(undefined);
    const [OnDidntWork, setOnDidntWork] = React.useState(undefined);
    const [OnWorks, setOnWorks] = React.useState(undefined);

    // Lottie
    const animationRef1 = useRef<Lottie>(null);
    const animationRef2 = useRef<Lottie>(null);
    const animationRef3 = useRef<Lottie>(null);
    const animationRef4 = useRef<Lottie>(null);
    const animationRef5 = useRef<Lottie>(null);

    // Comments API
    const [myComment, setMyComment] = useState("");
    const [commentData, setCommentData] = useState([]);

    const FetchCommentData = async () => {
        try {
            // const userCommentRef = ref(db, 'UserCommentData/' + username + '/' + 'Comments/' + props.id);
            // onValue(userCommentRef, (snapshot) => {
            //     if (snapshot.exists()) {
            //         const data = snapshot.val();
            //         let parsedData = [];

            //         // Retrieve data fields and parsing JSON object
            //         // Clean Comments
            //         let comments = data.Comments.split('!');
            //         comments = comments.filter(function(x){
            //             return x !== ""
            //         });
            //         // Clean Users
            //         let users = data.Username.split('!');
            //         users = users.filter(function(x){
            //             return x !== ""
            //         });

            //         // Clean Dates
            //         let dates = data.Dates.split('!');
            //         dates = dates.filter(function(x){
            //             return x !== ""
            //         });

            //         for (let i = 0; i < comments.length; i++) {
            //             if (i == 3) return;
            //             let temp = [data.ReviewID, comments[i], users[i], data.UserImageURL, dates[i]];
            //             parsedData.push(temp);
            //         }

            //         // console.log("THE COMMENTS ARRAY: ", comments);
            //         // console.log("THE USER ARRAY: ", users);
            //         setCommentData(parsedData);
            //     }
            // });

            const reviewCommentRef = ref(db, 'ReviewCommentData/' + props.id);
            onValue(reviewCommentRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let parsedData = [];
                    // iterate through comments for this particular review! 
                    for (let comment in data) {
                        if (parsedData.length >= 3) break;
                        console.log("A comment: " + JSON.stringify(data[comment])); 
                        data[comment]['Dates'] = dateFromNow(data[comment]['Dates'])
                        parsedData.push(data[comment]); 
                    }
                    setCommentData(parsedData);

                    
                }
            });




      
          } catch (e) {
            console.log("Error: ", e)
          }
    };

    let username = useAppSelector(selectUsername); 

    const {setTag, tag} = React.useContext(TagContext);

    const getTryingInfo = () => {
        get(child(ref(db), `UserTriedData/${username}/Trying/${props.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setOnTrying(true);
                animationRef2.current?.play(200, 200);
            } else {
                setOnTrying(false);
                animationRef2.current?.play(0, 0);
            }
        })
    }   

    const getDislikeInfo = () => {
        get(child(ref(db), `UserTriedData/${username}/disliked/${props.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setOnDidntWork(true);
                console.log("setOnDidntWork to true after getting!");
            } else {
                setOnDidntWork(false);
                console.log("setOnDidntWork to false after getting!");
            }
        })
    }

    const getLikeInfo = () => {
        get(child(ref(db), `UserTriedData/${username}/liked/${props.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setOnWorks(true);
            } else {
                setOnWorks(false);
            }
        })
    }

    const Like = () => {
        // Write Like Data
        set(ref(db, 'UserTriedData/' + username + '/' + "liked" + '/' + props.id), {
            username: `${props.user}`,
            title: `${props.heading}`,
            imageURL: `${props.imageLink}`,
            tags: `${props.tags}`
        });
        setOnWorks(true);
    }

    const deleteFromLikeList = () => {
        setOnWorks(false);
        const userTriedReviewsRoute = ref(db, 'UserTriedData/' + username + '/' + 'liked/' + props.id);
        set(userTriedReviewsRoute, null);
        animationRef3.current?.play(0, 0);
    }

    const didntLike = () => {
        // Write Dislike Data
        set(ref(db, 'UserTriedData/' + username + '/' + "dislike" + '/' + props.id), {
            username: `${props.user}`,
            title: `${props.heading}`,
            imageURL: `${props.imageLink}`,
            tags: `${props.tags}`
        });
        setOnDidntWork(true);
    }

    const deleteFromDislikeList = () => {
        setOnDidntWork(false);
        animationRef1.current?.play(0, 0);
    }

    const deleteFromTryList = () => {
        setOnTrying(false);
        const userTriedReviewsRoute = ref(db, 'UserTriedData/' + username + '/' + 'Trying/' + props.id);
        set(userTriedReviewsRoute, null);
        animationRef2.current?.play(0, 0);
    }

    const goingToTry = () => {
        // Write the Trying Data
        set(ref(db, 'UserTriedData/' + username + '/' + "Trying" + '/' + props.id), {
            username: `${props.user}`,
            title: `${props.heading}`,
            imageURL: `${props.imageLink}`,
            tags: `${props.tags}`
        });
        animationRef2.current?.play();
        setOnTrying(true)
    };

    const isCommentEmpty = () => {
        if (commentData.length == 0) {
            return(
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: -25, marginBottom: 20}}>
                    <Lottie style={{height: 200, width: 200}} source={require('../assets/LottieAnimations/empty.json')} autoPlay loop></Lottie>
                    <Text style={{color: "#A9A9A9"}}>{"No Comments Yet :^("}</Text>
                </View>
            )
        }
    }

    useEffect( () => {
        console.log("Looking at review: ", props.id);
        console.log("States Before, OnTrying: ", OnTrying);
        console.log("States Before, OnDidntWork: ", OnDidntWork);
        console.log("States Before, OnWorks: ", OnWorks);
        if (props.tags !== undefined) {
            setTagsData(props.tags.split(','));
        }
        FetchCommentData();

        if (OnTrying == undefined) {
            getTryingInfo();
        }
        
        if (OnDidntWork == undefined) {
            getDislikeInfo();
            // Animation Setters
            if (OnDidntWork) {
                animationRef1.current?.play(200, 200);
            } else {
                animationRef1.current?.play(0, 0);
            }
        }

        if (OnWorks == undefined) {
            getLikeInfo();
            // Animation Setters
            if (OnWorks) {
                animationRef3.current?.play(200, 200);
            } else {
                animationRef3.current?.play(0, 0);
            }
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
                            <View key={`${uuid.v4()}1`} style={styles.miniBlock}>
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
                                return(<Chip textStyle={{color: "white"}} style={{ marginRight: 2,
                                    marginLeft: 2, backgroundColor: getTagColor(v) }} key={`${uuid.v4()}`} icon="information" onPress={() => {
                                    setTag(v);
                                    props.navigation.navigate('MainScreen');
                                }}>{v[0]?.toUpperCase() + v.slice(1).toLowerCase().replace('_',' ').replace('&','-')}</Chip>);
                            } else {
                                return(<Chip style={styles.chip} key={`${uuid.v4()}`} icon="information" onPress={() => console.log('Pressed Loading')}>Loading Tags...</Chip>);
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

                    {/* Didn't Work! */}
                    <Popover
                        onOpenStart={() => {
                            if (OnDidntWork == false || OnDidntWork == undefined) {
                                // Add Didn't like, if Works is clicked, this will be set to false!
                                didntLike();
                                deleteFromLikeList();
                                console.log("Didn't like added!");
                            }
                            animationRef1.current?.play();
                            animationRef5.current?.play();
                        }}
                        placement={PopoverPlacement.BOTTOM}
                        backgroundStyle={{opacity: 0}}
                        popoverStyle={{borderRadius: 10, backgroundColor: "#f0f3f7"}}
                        from={(
                        <TouchableOpacity style={styles.functionBtnContainer}>
                            <Lottie style={{height: 44, width: 44}} ref={animationRef1} source={Dislike} loop={false}/>
                            <Text style={styles.funcTitleShare}>Didn't Work!</Text>
                        </TouchableOpacity>
                        )}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 5}}>
                                <Text>{"Awwww Sorry to hear... 😔"}</Text>
                                <Text style={{marginBottom: 10}}>{"Would you like help share why?"}</Text>
                                <Lottie style={{height: 70, width: 70, marginTop: -5, marginBottom: 5}} ref={animationRef5} source={Sad} loop={false}/>
                                <Button 
                                mode="contained"
                                style={{width: 140, height: 30, marginTop: -25, marginBottom: 5}}
                                onPress={() => {props.navigation.navigate('SubmitScreen')}}>
                                    <Text style={{fontSize: 10}}>Write a Review</Text>
                                </Button>
                            </View>
                    </Popover>

                    {/* Going to Try! */}
                    <Pressable onPress={() => {
                        if (OnTrying == false || OnTrying == undefined) {
                            goingToTry();
                            
                        } else {
                            deleteFromTryList();
                        }
                        }} style={styles.functionBtnContainer}>
                        <Lottie style={{height: 50, width: 50}} ref={animationRef2} source={Bookmark} loop={false}/>
                        <Text style={styles.funcGeneric}>Going to try!</Text>
                    </Pressable>
                    
                    {/* Works! */}
                    <Popover
                        onOpenStart={() => {
                            if (OnWorks == false || OnWorks == undefined) {
                                // Add Didn't like, if Works is clicked, this will be set to false!
                                Like();
                                deleteFromDislikeList();
                                console.log("Like added!");
                            }   
                            animationRef3.current?.play(); 
                            animationRef4.current?.play();         
                        }}
                        placement={PopoverPlacement.BOTTOM}
                        backgroundStyle={{opacity: 0}}
                        popoverStyle={{borderRadius: 10, backgroundColor: "#f0f3f7"}}
                        from={(
                        <TouchableOpacity style={styles.functionBtnContainerWorks}>
                            <Lottie style={{height: 70, width: 70}} ref={animationRef3} source={Heart} loop={false}/>
                            <Text style={styles.funcTitleShare2}>Works!</Text>
                        </TouchableOpacity>
                        )}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 5}}>
                                <Text>{"Woohoo! Glad to hear! 🎉🎉"}</Text>
                                <Text>{"Want to share for +100 tokens?"}</Text>
                                <Lottie style={{height: 80, width: 80, marginTop: -15}} ref={animationRef4} source={Tokens} loop={false}/>
                                <Button 
                                mode="contained"
                                style={{width: 140, height: 30, marginTop: -25, marginBottom: 5}}
                                onPress={() => {props.navigation.navigate('SubmitScreen')}}>
                                    <Text style={{fontSize: 10}}>Write a Review</Text>
                                </Button>
                            </View>
                    </Popover>
                </View>

                {/* Comment Title */}
                <View style={styles.CommentTitleContainer}>
                    <View style={{ 
                    borderRadius: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: '#d3d3d3',
                    width: "20%"
                    }}
                    />
                </View>

                {/* Comment Container */}
                <View style={styles.commentContainer}>
                    
                    {isCommentEmpty()}

                    {/* Comment */}
                    {commentData?.map((v) => {
                        return(
                            <View key={`${uuid.v4()}`} style={styles.containerComment}> 
                                <View style={styles.commentHeaderTop}>
                                    <Avatar size={24} rounded source={{uri: v['UserImageURL']}}/>
                                    <Text style={styles.profilenameTop}>{v['Username']}</Text>
                                    <Text style={{color: "gray", marginLeft: 10}}>{v['Dates']}</Text>
                                </View>
                                <View style={styles.commentDescriptionTop}>
                                <Text>
                                    {v['Comments']}  
                                </Text>
                                </View>  
                            </View>
                        );
                    }) }
                    
                        
                    <Pressable onPress={() => props.navigation.navigate('CommentsPage')}>
                        <Text style={{color: "#808080", marginTop: 5}}>View Comments</Text>
                    </Pressable>
                </View>
                
                <View style={{marginBottom: 10, marginTop: 10}}></View>
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
        backgroundColor: "#37aca4",
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
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    containerComment: {
        marginBottom:16
    },
    commentHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }, 
    profilenameTop: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginLeft: 10
    },
    commentDescriptionTop: {
        marginBottom: 10,
        marginLeft: 35
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
    commentHeaderTop: {
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

