import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/Main";
import Review1 from "./screens/Review1";
import Review2 from "./screens/Review2";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
    {/** To test your screen - frontend, just change the
     * initialRouteName to the screen that you want to test */}
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        gestureEnabled: false,
        animationEnabled: true
      }}
    >
        <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false, title: "Home Screen" }}
        />

        <Stack.Screen
            name="Review1"
            component={Review1}
            options={{ headerShown: false, title: "Review 1" }}
        />

<Stack.Screen
            name="Review2"
            component={Review2}
            options={{ headerShown: false, title: "Review 2" }}
        />
    </Stack.Navigator>
  </NavigationContainer>       

    
  );
}
