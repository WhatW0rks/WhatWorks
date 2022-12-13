import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// React Screens
import MainScreen from "../screens/Main";
import PostScreen from "../screens/PostScreen";
import ProductReviewForm from "../components/ProductReviewForm"; 
import LoadingScreen from '../screens/LoadingScreen';
import { Button } from "react-native";
import CommentsPage from "../components/CommentsPage";


const Stack = createStackNavigator();
export default function ExploreNavigator() {
    const childRef = useRef(null);

    const handleClick = () => {
        childRef.current.submitWrapper();
    };

    return (
        <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
            gestureEnabled: false,
            animationEnabled: true,
        }}>  

          {/* Explore Screen (ALL REVIEWS) */}
          <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false, title: ""}}
          />

          {/* Screen that handles posts/reviews */}
          <Stack.Screen
              name="PostScreen"
              component={PostScreen}
              options={{ title: "" }}
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

          {/* Loading Screen Implementation (FOR TESTING PURPOSES) */}
          <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ title: "" }}
          />

          {/* Comments Page */}
          <Stack.Screen
              name="CommentsPage"
              component={CommentsPage}
              options={{ title: "Comments Page" }}
          />
        </Stack.Navigator>
    );
  }

