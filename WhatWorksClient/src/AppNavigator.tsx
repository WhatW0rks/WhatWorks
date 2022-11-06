import * as React from 'react';
// import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/Main";
import PostScreen from "./screens/PostScreen";
import ProductReviewForm from "./components/ProductReviewForm"; 
import BottomNav from './components/BottomNavBar';
//React Contexts
import ReviewContext from './reviewSelectorContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [review, setReview] = React.useState(0);

  return (
    <ReviewContext.Provider value={{ review, setReview}}>
      <NavigationContainer>
      {/* r */}
      <BottomNav/>
    </NavigationContainer> 
  </ReviewContext.Provider>      
  );
}
