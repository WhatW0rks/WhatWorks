import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Lottie Animations
import Lottie from 'lottie-react-native';

// Firebase DB
import { database } from '../../firebase';
import { onValue, ref} from "firebase/database";

// Redux
import { selectUsername } from '../../userSlice';
import { useAppSelector } from '../../hooks';
import { useRef } from 'react';

const db = database;

export default function NavBarTop({navigation}) {

    const animationRef = useRef<Lottie>(null)

    let username = useAppSelector(selectUsername); 

    const [tokens, setTokens] = React.useState(0);

    const fetchCoinData = () => {
        const tokenRoute = ref(db, 'Tokens/' + username);
        onValue(tokenRoute, (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                setTokens(data.amount)
            }
        });
    }

    React.useEffect(() => {
        fetchCoinData();
        animationRef.current?.play();
    }, [])

    return(
        <View style={{display: "flex", flexDirection: "row", marginRight: 10}}>
            <View style={{display: "flex", flexDirection: "row",  alignItems: "center"}}>
                <Lottie style={{height: 30, width: 30}} source={require('../../assets/LottieAnimations/coin.json')} autoPlay loop></Lottie>
                <Text style={{fontWeight: "700", fontSize: 20}}>{`${tokens}`}</Text>
            </View>
            
            {/* <Pressable onPress={() => console.log("Shop is pressed")}>
                <Lottie style={{height: 50, width: 50, marginLeft: 2}} ref={animationRef} loop={false} source={require('../../assets/LottieAnimations/shop.json')}></Lottie>
            </Pressable> */}

            {/* <Button
                onPress={() => console.log("Pressed")}
                title="BTN2"
                color="#fff"
            /> */}
        </View>
    );

}