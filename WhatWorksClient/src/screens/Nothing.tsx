import * as React from 'react';
import Lottie from 'lottie-react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Nothing({navigation}) {
    return(
        <SafeAreaView style={styles.loadingContainer}>
            <View>
                <Lottie style={styles.animationContainer} source={require('../assets/LottieAnimations/nd.json')} autoPlay loop />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    animationContainer: {
        height: 400,
        width: 400,
        marginBottom: 100
    }
});