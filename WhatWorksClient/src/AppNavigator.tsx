import * as React from 'react';
import { useState } from "react";
// import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/Main";
import Review1 from "./screens/Review1";
import Review2 from "./screens/Review2";
import ProductReviewForm from "./components/ProductReviewForm"; 
const Stack = createStackNavigator();

// React Contexts
import ContextCount from './countContext';
import ReviewContext from './reviewSelectorContext';

export default function AppNavigator() {
  const [count, setCount] = useState(0);
  const [review, setReview] = useState(0);

  return (
    <ReviewContext.Provider value={{ review, setReview }}>
    <ContextCount.Provider value={{ count, setCount }}>
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
              name="Review1"
              component={Review1}
              options={{title: "" }}
          />

          <Stack.Screen
              name="Review2"
              component={Review2}
              options={{ title: "" }}
          />
          <Stack.Screen
              name="Post form"
              component={ProductReviewForm}
              options={{ title: "Product Review Form" }}
          />
      </Stack.Navigator>
    </NavigationContainer>       
  </ContextCount.Provider>
  </ReviewContext.Provider>
  );
}
