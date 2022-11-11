import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductReviewForm from "../components/ProductReviewForm"; 
import MainScreen from "../screens/Main";


const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="SubmitScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}>  
          {/* Content Creation Workflow */}
          <Stack.Screen
              name="SubmitScreen"
              component={ProductReviewForm}
              options={{ title: "Product Review Form" }}
          />
        </Stack.Navigator>
    );
  }