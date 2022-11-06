import * as React from 'react';
// import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// React Stack Screens
import HomeStackNavigator from './tabroutes/HomeStackNavigator';
import ExploreStackNavigator from './tabroutes/ExploreStackNavigator';
import ProfileStackNavigator from './tabroutes/ProfileStackNavigator';

//React Contexts
import ReviewContext from './reviewSelectorContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [review, setReview] = React.useState(0);

  return (
    <ReviewContext.Provider value={{review, setReview}}>

    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen
            name="HomeStack"
            component={ HomeStackNavigator }  
          />
          <Tab.Screen
            name="ExploreStack"
            component={ ExploreStackNavigator }  
          />
          <Tab.Screen
            name="ProfileStack"
            component={ ProfileStackNavigator }  
          />
      </Tab.Navigator>
    </NavigationContainer> 

  </ReviewContext.Provider>      
  );
}
