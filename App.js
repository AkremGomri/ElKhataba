import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen'; 
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import { Text, Button, View, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();


import type {Node} from 'react';


const App: () => Node = () => {
  return (
      <NavigationContainer style={styles.root}>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="SignIn"
            component={SigninScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignupScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root :{
    flex:1,
    backgroundColor:"#F9FBFC"

  }
});

export default App;