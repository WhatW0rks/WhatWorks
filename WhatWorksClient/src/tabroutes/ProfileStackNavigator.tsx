import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../screens/Profile';
import PostScreen from "../screens/PostScreen";
import ProfileEditScreen from '../screens/ProfileEditScreen'
import ProductReviewForm from "../components/ProductReviewForm";

import { Button } from "react-native";


const Stack = createStackNavigator();

export default function ProfileNavigator() {
    const childRef = useRef(null);

    const handleClick = () => {
        childRef.current.submitWrapper();
    };
    
    return (
        <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true
        }}
        > 
            {/* Profile Screen */} 
            <Stack.Screen
            name="ProfileScreen"
            component={Profile}
            options={{ headerShown: false, title: "" }}
            />

            {/* Screen that handles posts/reviews */}
            <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{ title: "" }}
            />

            {/* Profile Edit Screen */}
            <Stack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
                options={{ 
                    title: "",
                    presentation: "modal"
                }}
                
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
                    <Button
                        onPress={() => {
                            handleClick();
                        }}
                        title="Post Review!"
                    />
                    ),
                }}
            />
        </Stack.Navigator>
    );
  }