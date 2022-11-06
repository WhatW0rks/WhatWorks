import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';


const Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  
            <Stack.Screen
            name="ProfileScreen"
            component={Home}
            options={{ headerShown: false, title: "Profile Screen" }}
            />
        </Stack.Navigator>
    );
  }