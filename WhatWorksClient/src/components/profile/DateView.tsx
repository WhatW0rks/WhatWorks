import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const DateView = () => {
    const currDate = new Date();

    return (
        <View style={styles.container}>

            <Ionicons style={styles.icon} name="calendar" size={40} />
            <View style={styles.dateContainer}>
                <Text style={styles.day}>{currDate.getDate()}</Text>
                <Text style={styles.month}>{currDate.toLocaleString('default', { month: 'short' })}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        maxHeight: 64,
    },

    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft: 8
    },

    dateContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        
    },

    day: {
        fontSize: 24,
        flex: 1,

        display: "flex",
        alignItems: "center",
        marginTop: 8

    },

    month: {
        flex: 1,

        display: "flex",
        alignItems: "center",

    }
});

export default DateView