import * as React from 'react';
// import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/Main";
import PostScreen from "./screens/PostScreen";
import ProductReviewForm from "./components/ProductReviewForm"; 
const Stack = createStackNavigator();

export default function AppNavigator() {

  return (

      <NavigationContainer>
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
              name="PostScreen"
              component={PostScreen}
              options={{ title: "" }}
          />
          <Stack.Screen
              name="Post form"
              component={ProductReviewForm}
              options={{ title: "Product Review Form" }}
          />
      </Stack.Navigator>
    </NavigationContainer>       
  );
}
