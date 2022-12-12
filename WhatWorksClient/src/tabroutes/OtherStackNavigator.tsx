import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Other from '../screens/MyMetrics';
import Intro from '../screens/Intro';
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
                component={Intro}
                options={{ headerShown: false, title: "" }}
            />
        </Stack.Navigator>
    );
}