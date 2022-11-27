import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ProductReviewForm from "../components/ProductReviewForm";
import { Button } from "react-native";


const Stack = createStackNavigator();

export default function HomeNavigator() {
    const childRef = useRef(null);

    const handleClick = () => {
        childRef.current.submitWrapper();
    };
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
              initialParams={{reference: childRef}}
              options={{ 
                title: "",
                presentation: "modal",
                headerRight: () => (
                    // <Button
                    //   onPress={() => {handleClick()}}
                    //   title="Post Review!"
                    //   style={{marginRight: 10}}
                    // />
                    <Button
                        onPress={() => {handleClick()}}
                        title="Post Review!"
                    />
                  ),
             }}
          />
        </Stack.Navigator>
    );
  }