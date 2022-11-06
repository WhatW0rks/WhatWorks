import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({navigation}) {
    return(
        <SafeAreaView style={styles.loadingContainer}>
            <Text> Home Screen </Text>
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