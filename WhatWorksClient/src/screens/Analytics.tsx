import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Icon } from '@rneui/themed';

const Analytics = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analytics</Text>

            <View style={styles.subContainer}>
                <Card >
                    <Card.Title>Severe Symptoms</Card.Title>
                    <Card.Divider />
                    <View >

                        <Text >Your Worst Days</Text>
                    </View>
                </Card>

                <Card >
                    <Card.Title>Symptoms Free</Card.Title>
                    <Card.Divider />
                    <View >

                        <Text >Your Best Days</Text>
                    </View>
                </Card>
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
        fontWeight: "bold"
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