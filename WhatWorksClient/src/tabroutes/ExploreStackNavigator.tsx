import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// React Screens
import MainScreen from "../screens/Main";
import PostScreen from "../screens/PostScreen";
import ProductReviewForm from "../components/ProductReviewForm"; 
import LoadingScreen from '../screens/LoadingScreen';


const Stack = createStackNavigator();

export default function ExploreNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  

          {/* Explore Screen (ALL REVIEWS) */}
          <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false, title: "Home Screen" }}
          />

          {/* Screen that handles posts/reviews */}
          <Stack.Screen
              name="PostScreen"
              component={PostScreen}
              options={{ title: "" }}
          />

          {/* Content Creation Workflow */}
          <Stack.Screen
              name="PostForm"
              component={ProductReviewForm}
              options={{ title: "Product Review Form" }}
          />

          {/* Loading Screen Implementation (FOR TESTING PURPOSES) */}
          <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ title: "" }}
          />
        </Stack.Navigator>
    );
  }

