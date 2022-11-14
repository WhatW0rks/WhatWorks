import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux test
import { incremented, decremented, reset, store } from '../redux/counterExample/counter';

export default function LoadingScreen({navigation}) {
    const [count, setCount] = React.useState(null);
    store.subscribe(() => {
        let x = store.getState().value;
        // console.log("The Value", x);
        setCount(x);
    });
    return(
        <SafeAreaView style={styles.loadingContainer}>
            <Text> Profile Screen </Text>
            <Text>{`${count}`}</Text>
            <Button title='Increment' onPress={() => store.dispatch(incremented()) }></Button>
            <Button title='Decrement' onPress={() => store.dispatch(decremented()) }></Button>
            <Button title='Reset' onPress={() => store.dispatch(reset()) }></Button>
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