import React, { useContext, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ProductReviewForm from "../components/ProductReviewForm";

// Intro Sequence
import IntroStart from '../screens/Intro'
import Intro2 from '../screens/IntroPage2'
import Intro3 from '../screens/IntroPage3'

import NavBarTop from '../components/smallComponents/NavBarTop'

import { Button, Image, View } from "react-native";
import IntroContext from "../IntroState";


const Stack = createStackNavigator();

export default function HomeNavigator() {
    let {intro, setIntro} = useContext(IntroContext);
    const childRef = useRef(null);

    const handleClick = () => {
        childRef.current.submitWrapper();
    };

    const handleInitRoute = () => {
        if (intro) {
            console.log("Entered Intro!")
            return "Intro"
        } else {
            console.log("Entered Homescreen!")
            return "HomeScreen"
        }
    }

    return (
        <Stack.Navigator
        initialRouteName={handleInitRoute()}
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  

            {/* Onboarding Screens */}
            <Stack.Screen
                name="Intro"
                component={IntroStart}
                options={{ headerShown: true, title: "" }}
            />

            <Stack.Screen
                name="Intro2"
                component={Intro2}
                options={{ headerShown: true, title: "" }}
            />

            <Stack.Screen
                name="Intro3"
                component={Intro3}
                options={{ headerShown: true, title: "" }}
            />

            {/* Home */}
            <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{ 
                headerShown: true, 
                title: "",
                headerStyle: {
                    height: 90
                },
                headerRight: () => (
                    <NavBarTop navigation={undefined}/>
                ),
                headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                        <Image style={{height: 40, width: 70}} source={require('../assets/WhatWorksLogo.png')}></Image>
                    </View>
                    
                ),
             }}
            />

            {/* Content Creation Workflow */}
          <Stack.Screen
              name="SubmitScreen"
              component={ProductReviewForm}
              initialParams={{reference: childRef}}
              options={{ 
                title: "",
                presentation: "modal",
                headerRight: () => (
                    // <Button
                    //   onPress={() => {handleClick()}}
                    //   title="Post Review!"
                    //   style={{marginRight: 10}}
                    // />
                    <Button
                        onPress={() => {handleClick()}}
                        title="Post Review!"
                    />
                  ),
             }}
          />
        </Stack.Navigator>
    );
  }