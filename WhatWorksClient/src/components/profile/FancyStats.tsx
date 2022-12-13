import React from 'react'
import { View, Text, Image, StyleSheet } from "react-native";

// Lottie Animations
import Lottie from 'lottie-react-native';

type Props = {
    title: string,
    value: string
}

const FancyStats = ({title, value }: Props) => {

    const renderIcon = (s: string) => {
        if (s == 'Heartburn') {
            return(<Lottie style={{height: 50, width: 50}} source={require('../../assets/LottieAnimations/fire.json')} autoPlay loop></Lottie>)
        } else if (s == 'Medicine') {
            return(<Lottie style={{height: 40, width: 40}} source={require('../../assets/LottieAnimations/medicine.json')} autoPlay loop></Lottie>)
        } else {
            return(<Lottie style={{height: 40, width: 40}} source={require('../../assets/LottieAnimations/shield.json')} autoPlay loop></Lottie>)
        }
    }

    return (
            <View style={styles.container}>
                {renderIcon(title)}
                <View style={styles.subContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value} times</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 24,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: "#f0f0f0"
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 8
    },
    subContainer: {
        display: "flex",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 12,
        fontWeight: "300"
    },
    value: {
        fontSize: 14,
        fontWeight: "600"
    }
});

export default FancyStats