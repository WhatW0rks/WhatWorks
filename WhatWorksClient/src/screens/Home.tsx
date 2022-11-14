import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeMinimizedProductReviewPage from '../components/HomeMinimizedProductReviewPage';

export default function LoadingScreen({navigation}) {
    const [data, setData] = React.useState({
        heading: "Cape Cod Chips", user:"Jane Doe",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore `,
        imageLink: "https://www.capecodchips.com/wp-content/uploads/2020/05/sea-salt_vinegar-1.jpg"
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
                heading = "A GOOD BURGER"
                user = {data.user}
                description = {data.description}
                imageLink = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Burger_King_double_cheeseburger.jpg"
                link={undefined}
                navigation={navigation}
                statistics={[[]]}
                />

                <HomeMinimizedProductReviewPage
                heading = "ANOTHER GOOD BURGER"
                user = {data.user}
                description = {data.description}
                imageLink = "https://upload.wikimedia.org/wikipedia/commons/f/f5/Bulgogi_burger.jpg"
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