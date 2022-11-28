import React, { useRef } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

// Lottie Animations
import Lottie from 'lottie-react-native';


export default function TabBarAdvancedButton({ bgColor, navigation, ...props }) {
    const animationRef = useRef<Lottie>(null)
    
    return (
        <View style={styles.container}>
            {/* <TabBg color={bgColor} style={styles.background} /> */}
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                animationRef.current?.play();
                navigation.navigate('SubmitScreen')
            }}>
                <Lottie style={{height: 95, width: 95}} ref={animationRef} source={require('../../assets/LottieAnimations/add.json')} loop={false}/>
            </TouchableOpacity>
        </View>
    );
}


  const styles = StyleSheet.create({
  container: {
      position: 'relative',
      width: 75,
      alignItems: 'center'
    },
    background: {
      position: 'absolute',
      top: 0,
    },
    button: {
      top: -22.5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 27,
      backgroundColor: '#E94F37',
    },
    buttonIcon: {
      fontSize: 16,
      color: '#F6F7EB'
    }
  });