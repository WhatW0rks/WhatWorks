import * as React from 'react';
import Lottie from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({navigation}) {
    return(
        <SafeAreaView style={styles.loadingContainer}>
            <View>
                <Lottie style={styles.animationContainer} source={require('../assets/LottieAnimations/salad.json')} autoPlay loop />
                {/* <Text>Loading...</Text> */}
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
        height: 250,
        width: 250,
        marginBottom: 100
    }
});