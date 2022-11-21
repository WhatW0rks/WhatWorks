import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMinimizedProductReviewPage from '../components/HomeMinimizedProductReviewPage';

export default function LoadingScreen({navigation}) {
    const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.`

    const [data, setData] = React.useState({
        heading: "Roa's Homemade Marinara", user:"Jane Doe",
        description: `This is my favorite marinara sauce of all time. It is fantastic with meatballs and doesn’t seem to lead to a flare-up in my symptoms. I highly recommend it to anyone who craves marinara sauce and typically isn’t able to eat it due to the high acid!`,
        imageLink: "http://cdn.shopify.com/s/files/1/0611/3456/9715/products/Raos_Sauce_Marinara_24oz_ProductShot_600x600_f9fffffc-a193-4cc8-9161-9dac5794b0e1.png?v=1648155711"
    });

    return(
        <SafeAreaView style={styles.loadingContainer}>
            <ScrollView>
                <HomeMinimizedProductReviewPage
                heading = {data.heading}
                user = {data.user}
                description = {data.description}
                imageLink = {data.imageLink}
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                />

                <HomeMinimizedProductReviewPage
                heading = "Farmer Joe's Tomatoes"
                user = "flareup101010"
                description = {sampleText}
                imageLink = "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg"
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                />

                <HomeMinimizedProductReviewPage
                heading = "Tylenol Extra Strength"
                user = "MedicineFreak1837"
                description = {sampleText}
                imageLink = "https://i5.walmartimages.com/asr/91feb7bb-fdb8-49a4-9b39-6bc1aa5f5662.102ceddd1fc30cc301865ccc5d3e6c07.jpeg"
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
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