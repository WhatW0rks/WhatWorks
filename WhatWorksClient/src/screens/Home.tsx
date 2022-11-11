import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProductReviewPage from '../components/UserProductReviewPage';

export default function LoadingScreen({navigation}) {
    const [data, setData] = React.useState({
        heading: "Cape Cod Chips", user:"Jane Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageLink: "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg"
    });

    return(
        <SafeAreaView style={styles.loadingContainer}>
            <ScrollView>
                <UserProductReviewPage 
                heading = {data.heading}
                user = {data.user}
                description = {data.description}
                imageLink = {data.imageLink}
                link={undefined}
                navigation={navigation}
                />

                <UserProductReviewPage 
                heading = "A GOOD BURGER"
                user = {data.user}
                description = {data.description}
                imageLink = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Burger_King_double_cheeseburger.jpg"
                link={undefined}
                navigation={navigation}
                />

                <UserProductReviewPage 
                heading = "ANOTHER GOOD BURGER"
                user = {data.user}
                description = {data.description}
                imageLink = "https://upload.wikimedia.org/wikipedia/commons/f/f5/Bulgogi_burger.jpg"
                link={undefined}
                navigation={navigation}
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