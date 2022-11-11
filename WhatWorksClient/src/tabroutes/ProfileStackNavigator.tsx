import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../screens/Profile';


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
            component={Profile}
            options={{ headerShown: false, title: "" }}
            />
        </Stack.Navigator>
    );
  }