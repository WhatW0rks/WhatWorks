import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import { LinearProgress } from '@rneui/themed';

type Props = {
    days: string;
    progress: number
};

const MonthlyProgress = ({ days, progress }: Props) => {
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
        flex: 1
    },

    days: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold"
    },

    progress: {
        flex: 2,
        marginLeft: 8
    }
});

export default MonthlyProgress