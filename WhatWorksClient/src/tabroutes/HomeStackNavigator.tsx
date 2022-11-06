import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';


const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  
            <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{ headerShown: false, title: "Home Screen" }}
            />
        </Stack.Navigator>
    );
  }