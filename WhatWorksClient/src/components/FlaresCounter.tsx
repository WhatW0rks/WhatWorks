import React from 'react'
import { View, Text, Button, StyleSheet } from "react-native";

interface Props {
    count: number;
    updateCount: (count: number) => void;
};

const FlaresCounter = ({ count, updateCount }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{count}</Text>

            <View style={styles.buttons}>
                <Button title="+"
                    onPress={() => updateCount(1)} />

                <Button title="-"
                    onPress={() => updateCount(-1)
                    } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 24

    },

    text: {
        fontSize: 32,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },

    buttons: {
        display: "flex",
        flexDirection: "column",
        flex: 2,


    }
});

export default FlaresCounter