import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ProductReviewForm from "../components/ProductReviewForm";


const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  
            {/* Home */}
            <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{ headerShown: false, title: "" }}
            />

            {/* Content Creation Workflow */}
            <Stack.Screen
                name="SubmitScreen"
                component={ProductReviewForm}
                options={{ title: "Product Review Form" }}
            />
        </Stack.Navigator>
    );
  }