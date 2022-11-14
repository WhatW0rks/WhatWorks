import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({navigation}) {

     React.useEffect(()=> {
        // const PanResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: (evt, gestureState) => true,
        //     onPanResponderMove: (evt, gestureState) => {
        //     },
        //     onPanResponderRelease: (evt, gestureState) => {
        //     }
        // })
     }, [])

    return(
        <SafeAreaView style={styles.loadingContainer}>
            <Text> Other Screen </Text>
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