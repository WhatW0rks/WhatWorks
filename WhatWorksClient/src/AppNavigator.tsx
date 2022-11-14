import * as React from 'react';
// import { View, Text, Button } from 'react-native';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// React Stack Screens
import HomeStackNavigator from './tabroutes/HomeStackNavigator';
import ExploreStackNavigator from './tabroutes/ExploreStackNavigator';
import ProfileStackNavigator from './tabroutes/ProfileStackNavigator';
import PostStackNavigator from'./tabroutes/PostStackNavigator';
import OtherStackNavigator from'./tabroutes/OtherStackNavigator';

// Components
import TabBarAdvancedButton from './components/smallComponents/AdvanceTabButton';

// React Contexts
import ReviewContext from './reviewSelectorContext';

// UI
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [review, setReview] = React.useState(0);

  return (
    <ReviewContext.Provider value={{review, setReview}}>

    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'HomeStack') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'CreationStack') {
                iconName = focused
                  ? 'ios-search'
                  : 'ios-search-outline';
              } else if (route.name === 'ExploreStack') {
                iconName = focused
                  ? 'ios-search'
                  : 'ios-search-outline';
              } else if (route.name === 'OtherStack') {
                iconName = focused
                  ? 'ios-body'
                  : 'ios-body-outline';
              } else if (route.name === 'ProfileStack') {
                iconName = focused
                  ? 'ios-body'
                  : 'ios-body-outline';
              }
    
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
          <Tab.Screen
            name="HomeStack"
            component={ HomeStackNavigator } 
            options={{ headerShown: false, title: "Home"}}
          />
          <Tab.Screen
            name="ExploreStack"
            component={ ExploreStackNavigator }  
            options={{ headerShown: false, title: "Explore"}}
          />
          <Tab.Screen
            name="CreationStack"
            component={ PostStackNavigator }  
            options={({ navigation }) => ({
              tabBarButton: (props) => (
                <TabBarAdvancedButton bgColor={"blue"} navigation={navigation} {...props} />
              ),
              headerShown: false,
              title: "Post",
            })}
          />
          <Tab.Screen
            name="OtherStack"
            component={ OtherStackNavigator }  
            options={{ headerShown: false, title: "Other"}}
          />
          <Tab.Screen
            name="ProfileStack"
            component={ ProfileStackNavigator }  
            options={{ headerShown: false, title: "Profile"}}
          />
      </Tab.Navigator>
    </NavigationContainer> 

  </ReviewContext.Provider>      
  );
}
