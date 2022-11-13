import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../hooks';
import { selectUsername } from '../userSlice';
export default function LoadingScreen({navigation}) {
    const username = useAppSelector(selectUsername);
    return(
        <SafeAreaView style={styles.loadingContainer}>
            <Text> Profile Screen for {username} </Text>
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