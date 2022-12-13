import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Card, Button, Icon } from '@rneui/themed';

// Expo Fonts
import { useFonts } from 'expo-font';

interface AnalyticsProperties { 
    navigation: any;
}

const Analytics = (props: AnalyticsProperties) => {

    // Fonts
    const [fontsLoaded] = useFonts({
        'Futura-Light': require('../assets/fonts/futura_light.ttf'),
        'Futura-Medium': require('../assets/fonts/futura_medium.ttf'),
        'Futura-Bold': require('../assets/fonts/futura_bold.ttf'),
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analytics</Text>

            <View style={styles.subContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Pressable onPress={() => props.navigation.navigate("Liked")}>
                        <Card >
                            <Card.Title style={{fontFamily: "Futura-Bold"}}>Liked Content</Card.Title>
                            <Card.Divider />
                            <View >
                                <Text>What has Worked</Text>
                            </View>
                        </Card>
                    </Pressable>

                    <Pressable onPress={() => props.navigation.navigate("Dislike")}>
                        <Card >
                            <Card.Title style={{fontFamily: "Futura-Bold"}}>Disliked Content</Card.Title>
                            <Card.Divider />
                            <View >

                                <Text>What has not Worked</Text>
                            </View>
                        </Card>
                    </Pressable>

                    <Pressable onPress={() => props.navigation.navigate("Empty")}>
                        <Card >
                            <Card.Title style={{fontFamily: "Futura-Bold"}}>Symptoms Free</Card.Title>
                            <Card.Divider />
                            <View >
                                <Text >Your Best Days</Text>
                            </View>
                        </Card>
                    </Pressable>

                    <Pressable onPress={() => props.navigation.navigate("Empty")}>
                        <Card >
                            <Card.Title style={{fontFamily: "Futura-Bold"}}>Severe Symptoms</Card.Title>
                            <Card.Divider />
                            <View >

                                <Text >Your Worst Days</Text>
                            </View>
                        </Card>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Futura-Bold"
    },

    subContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },

    card: {
        flex: 1
    }
});

export default Analytics