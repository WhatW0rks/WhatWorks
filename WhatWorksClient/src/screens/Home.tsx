import * as React from 'react';
import { Dimensions, Image, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMinimizedProductReviewPage, { ProductProperties } from '../components/HomeMinimizedProductReviewPage';

const WhatWorks = require('../assets/WhatWorksLogo.png');

export default function LoadingScreen({navigation}) {
    const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.`
    const comments1 = [{user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '5 hours ago', comment: 'This is definitely my go to marinara!'}, {user: 'kathy123', userImageURL: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg', time: '4 hours ago', comment: 'or you can make your own, helps a lot personally'}, {user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '1 hour ago', comment: 'Wish I had the time to do that!'}] as ProductProperties["comments"]
    const comments2 = [{user: 'kathy123', userImageURL: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg', time: '1 day ago', comment: "ugh, I wish I liked this. just doesn't taste enough like 'real' pasta to me :("}, {user: 'pastaluvr', userImageURL: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg', time: '18 hours ago', comment: 'Honestly fair enough. It was VERY weird at first.'}, {user: 'bob123', userImageURL: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg', time: '1 hour ago', comment: "Yes, Barrilla's the best!!"}] as ProductProperties["comments"]
    const comments3 = [{user: 'annaj1999', userImageURL: 'https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg?width=256&s=fc15e67e2b431bbd2e93e980be3090306b78be55', time: '3 hours ago', comment: "😂😅"}] as ProductProperties["comments"]

    // Refresh Handler
    const [refreshing, setRefreshing] = React.useState(false);

    // OnRefresh
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("Enter refresh");
        setTimeout( () => {
            console.log("Exit refresh!");
            setRefreshing(false); 
        }, 5000);
      }, []);
      
    const [data, setData] = React.useState({
        heading: "Rao's Homemade Marinara", user:"annaj1999",
        description: `This is my favorite marinara sauce of all time. It is fantastic with meatballs and doesn’t seem to lead to a flare-up in my symptoms. I highly recommend it to anyone who craves marinara sauce and typically isn’t able to eat it due to the high acid!`,
        imageLink: "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711"
    });

    return(
        <SafeAreaView style={styles.loadingContainer}>
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >
                <HomeMinimizedProductReviewPage
                heading = {data.heading}
                user = {data.user}
                description = {data.description}
                imageLink = {data.imageLink}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={comments1}
                tags={['Cheap', 'Easy to Prepare', 'Italian', 'Go-to meal']}
                />

                <HomeMinimizedProductReviewPage
                heading = "Barilla Whole Grain Penne"
                user = "pastaluvr"
                description = {"I wanted to try this to up my fiber intake. Made it with some marinara sauce and it was alright. Kinda weird tasting at first but you get used to it 🤷‍♀️"}
                imageLink = "http://2.bp.blogspot.com/-1FsN7bqEUOk/UPjbUhndF0I/AAAAAAAAXbQ/kNBR9NDeonw/s1600/Barilla%2Bwhole%2Bgrain%2Bpenne%2Bbox.jpg"
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={comments2}
                tags={['High Fiber', 'Pasta']}
                />

                <HomeMinimizedProductReviewPage
                heading = "Tylenol Extra Strength"
                user = "bob123"
                description = {"Tylenol's my go to. Only thing is be careful not to take too much at once..."}
                imageLink = "https://i5.walmartimages.com/asr/91feb7bb-fdb8-49a4-9b39-6bc1aa5f5662.102ceddd1fc30cc301865ccc5d3e6c07.jpeg"
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                comments={comments3}
                tags={['Medicine', 'Other']}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});