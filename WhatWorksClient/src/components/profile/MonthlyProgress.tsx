import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import { LinearProgress } from '@rneui/themed';

// Expo Fonts
import { useFonts } from 'expo-font';

type Props = {
    days: string;
    progress: number
};

const MonthlyProgress = ({ days, progress }: Props) => {

    // Fonts
    const [fontsLoaded] = useFonts({
        'Futura-Light': require('../../assets/fonts/futura_light.ttf'),
        'Futura-Medium': require('../../assets/fonts/futura_medium.ttf'),
        'Futura-Bold': require('../../assets/fonts/futura_bold.ttf'),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Monthly Progress</Text>
                <Text style={styles.days}>{days} Days</Text>
            <LinearProgress style={styles.progress}
                value={progress}
                variant="determinate"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: "#efefef"
    },

    label: {
        fontSize: 13,
        flex: 1,
        fontFamily: "Futura-Bold"
    },

    days: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Futura-Bold"
    },

    progress: {
        flex: 2,
        marginLeft: 2,
        height: 10,
        borderRadius: 10
    }
});

export default MonthlyProgress