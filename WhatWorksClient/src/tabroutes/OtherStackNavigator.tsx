import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Other from '../screens/MyMetrics';
import Intro from '../screens/Intro';
import Nothing from '../screens/Nothing';
import Liked from '../screens/Liked';
import Dislike from '../screens/Dislike';

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
                component={Other}
                options={{ headerShown: false, title: "" }}
            />
            <Stack.Screen
                name="Empty"
                component={Nothing}
                options={{ headerShown: true, title: "" }}
            />
            <Stack.Screen
                name="Liked"
                component={Nothing}
                options={{ headerShown: true, title: "" }}
            />
            <Stack.Screen
                name="Dislike"
                component={Nothing}
                options={{ headerShown: true, title: "" }}
            />
        </Stack.Navigator>
    );
}