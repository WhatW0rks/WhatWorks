import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Other from '../screens/Metrics';

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
        </Stack.Navigator>
    );
  }