import { color } from '@rneui/base';
import * as React from 'react';
import { Dimensions, Image, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMinimizedProductReviewPage, { ProductProperties } from '../components/HomeMinimizedProductReviewPage';

const WhatWorks = require('../assets/WhatWorksLogo.png');

// Firebase database
import { database } from '../firebase';
import { child, get, onValue, ref, set } from "firebase/database";
const db = database;

export default function LoadingScreen({navigation}) {
    const comments1 = [
        {user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '5 hours ago', comment: 'This is definitely my go to marinara!'}, 
        {user: 'kathy123', userImageURL: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg', time: '4 hours ago', comment: 'or you can make your own, helps a lot personally'}, 
        {user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '1 hour ago', comment: 'Wish I had the time to do that!'}] as ProductProperties["comments"]

    const comments2 = [{user: 'kathy123', userImageURL: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg', time: '1 day ago', comment: "ugh, I wish I liked this. just doesn't taste enough like 'real' pasta to me :("}, {user: 'pastaluvr', userImageURL: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg', time: '18 hours ago', comment: 'Honestly fair enough. It was VERY weird at first.'}, {user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '1 hour ago', comment: "Yes, Barrilla's the best!!"}] as ProductProperties["comments"]
    const comments3 = [{user: 'annaj1999', userImageURL: 'https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg?width=256&s=fc15e67e2b431bbd2e93e980be3090306b78be55', time: '3 hours ago', comment: "😂😅"}] as ProductProperties["comments"]

    // Refresh Handler
    const [refreshing, setRefreshing] = React.useState(false);

    // Review Directory
    const [reviewDir, setReviewDir] = React.useState([]);

    // Tags Data
    const [masterData, setMasterData] = React.useState([
        [
            "Rao's Homemade Marinara",
            `This is my favorite marinara sauce of all time. It is fantastic with meatballs and doesn’t seem to lead to a flare-up in my symptoms. I highly recommend it to anyone who craves marinara sauce and typically isn’t able to eat it due to the high acid!`,
            "annaj1999", 
            ['Cheap', 'Easy to Prepare', 'Italian', 'Go-to meal'], 
            "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711"
        ],

        [
            "Barilla Whole Grain Penne",
            "I wanted to try this to up my fiber intake. Made it with some marinara sauce and it was alright. Kinda weird tasting at first but you get used to it 🤷‍♀️",
            "pastaluvr",
            ['High Fiber', 'Pasta'],
            "http://2.bp.blogspot.com/-1FsN7bqEUOk/UPjbUhndF0I/AAAAAAAAXbQ/kNBR9NDeonw/s1600/Barilla%2Bwhole%2Bgrain%2Bpenne%2Bbox.jpg"
        ],

        [
            "Tylenol Extra Strength",
            "Tylenol's my go to. Only thing is be careful not to take too much at once...",
            "bob123",
            ['Medicine', 'Other'],
            "https://i5.walmartimages.com/asr/91feb7bb-fdb8-49a4-9b39-6bc1aa5f5662.102ceddd1fc30cc301865ccc5d3e6c07.jpeg"

        ],

        [
            "Barilla Whole Grain Penne",
            "I wanted to try this to up my fiber intake. Made it with some marinara sauce and it was alright. Kinda weird tasting at first but you get used to it 🤷‍♀️",
            "pastaluvr",
            ['High Fiber', 'Pasta'],
            "http://2.bp.blogspot.com/-1FsN7bqEUOk/UPjbUhndF0I/AAAAAAAAXbQ/kNBR9NDeonw/s1600/Barilla%2Bwhole%2Bgrain%2Bpenne%2Bbox.jpg"
        ],

        [
            "Rao's Homemade Marinara",
            `This is my favorite marinara sauce of all time. It is fantastic with meatballs and doesn’t seem to lead to a flare-up in my symptoms. I highly recommend it to anyone who craves marinara sauce and typically isn’t able to eat it due to the high acid!`,
            "annaj1999", 
            ['Medicine', 'Other'], 
            "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711"
        ],
    ]);

    const getRandomReviews = async () => {
        let parsedIDData = [];
        let randomIDs = [];
        let masterData = [];
        
        get(child(ref(db), `Index`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()

                for (let key in data) {
                    if (!data.hasOwnProperty(key)) continue;
                    parsedIDData.push(data[key].userReviewID)
                }
                
            } 
        }).then(() => {
             // Randomly get 5 review ID's
             while (randomIDs.length < 6) {
                const randomElement = parsedIDData[Math.floor(Math.random() * parsedIDData.length)];
                if (randomIDs.indexOf(randomElement) <= -1) {
                    randomIDs.push(randomElement)
                }
            }
            
            console.log("Selected 5 random ID's", randomIDs);

            for (let idIndex=0; idIndex < randomIDs.length; idIndex++) {
                console.log(randomIDs[idIndex]);

                get(child(ref(db), `Reviews/${randomIDs[idIndex]}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        let data = snapshot.val()

                        // Title, Desc, Username, Tags, URL
                        let tempTags = data.tags.split(",")
                        
                        for (let i = 0; i < tempTags.length; i++) {
                            tempTags[i] = tempTags[i].charAt(0).toUpperCase() + tempTags[i].slice(1).toLowerCase().replace('_',' ').replace('&','-')
                        }

                        let comments = [] ; 



                        get(child(ref(db), `ReviewCommentData/${randomIDs[idIndex]}`)).then((snapshot) => {
                            if (snapshot.exists()) {
                                let data = snapshot.val(); 
                                for (let item in data) {
                                    comments.push({comment: data[item].Comments, user: data[item].Username, time: data[item].Dates, userImageURL: data[item].UserImageURL})      
                                }

                            }})


                        let temp = [data.title, data.review, data.username, tempTags, data.imageURL, comments, randomIDs[idIndex]];
                        console.log("Temp: " + temp)

                        console.log("THE TAGS: ", tempTags)
                        

                        masterData.push(temp); 
                                       
                    } else {
                        console.log("Review doesn't exist!")
                    }
                    if (masterData[0] !== undefined && 
                        masterData[1] !== undefined &&
                        masterData[2] !== undefined &&
                        masterData[3] !== undefined &&
                        masterData[4] !== undefined && 
                        masterData[5] !== undefined) {
                            setMasterData(masterData)
                    }

                    // setTimeout( () => {
                    //     setMasterData(masterData);
                    // }, 1000)
                    
                })
            }

        })
    }

    // OnRefresh
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        getRandomReviews();

        setTimeout( () => {
            setRefreshing(false); 
        }, 3000);
      }, []);
      
    const [data, setData] = React.useState({
        heading: "Rao's Homemade Marinara", user:"annaj1999",
        description: `This is my favorite marinara sauce of all time. It is fantastic with meatballs and doesn’t seem to lead to a flare-up in my symptoms. I highly recommend it to anyone who craves marinara sauce and typically isn’t able to eat it due to the high acid!`,
        imageLink: "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711"
    });

    React.useEffect(() => {

        getRandomReviews();

    }, [])

    return(
        <SafeAreaView style={styles.Container} edges={['left', 'right']}>
            <ScrollView style={{flex: 1,  width: "100%"}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >
                <HomeMinimizedProductReviewPage
                heading = {masterData[0][0]}
                user = {masterData[0][2]}
                description = {masterData[0][1]}
                imageLink = {masterData[0][4]}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={Array.isArray(masterData[0][5]) ? masterData[0][5] : []}
                tags={masterData[0][3]}
                id={masterData[0][6]}
                />

                <HomeMinimizedProductReviewPage
                heading = {masterData[1][0]}
                user = {masterData[1][2]}
                description = {masterData[1][1]}
                imageLink = {masterData[1][4]}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={Array.isArray(masterData[1][5]) ? masterData[1][5] : []}
                tags={masterData[1][3]}
                id = {masterData[1][6]}
                />

                <HomeMinimizedProductReviewPage
                heading = {masterData[2][0]}
                user = {masterData[2][2]}
                description = {masterData[2][1]}
                imageLink = {masterData[2][4]}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={Array.isArray(masterData[2][5]) ? masterData[2][5] : []}
                tags={masterData[2][3]}
                id = {masterData[2][6]}
                />

                <HomeMinimizedProductReviewPage
                heading = {masterData[3][0]}
                user = {masterData[3][2]}
                description = {masterData[3][1]}
                imageLink = {masterData[3][4]}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={Array.isArray(masterData[3][5]) ? masterData[3][5] : []}
                tags={masterData[3][3]}
                id = {masterData[3][6]}
                />

                <HomeMinimizedProductReviewPage
                heading = {masterData[4][0]}
                user = {masterData[4][2]}
                description = {masterData[4][1]}
                imageLink = {masterData[4][4]}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={Array.isArray(masterData[4][5]) ? masterData[4][5] : []}
                tags={masterData[4][3]}
                id ={masterData[4][6]}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
                
    }
});