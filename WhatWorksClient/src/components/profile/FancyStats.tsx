import React from 'react'
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
    title: string,
    value: string
}

const FancyStats = ({title, value }: Props) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={{ uri: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg' }}
            />
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
        backgroundColor: "#efefef"
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