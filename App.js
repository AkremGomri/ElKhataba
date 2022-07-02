// import at the very top of everything.
import "./ignoreWarnings";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotoScreen from './src/screens/PhotoScreen'
import LocScreen from './src/screens/LocScreen';
import GenderScreen from './src/screens/GenderScreen';
import HoroscopeScreen from './src/screens/HoroscopeScreen';
import BirthDateScreen from './src/screens/BirthDateScreen';
import WelcomeScreen from './src/screens/WelcomeScreen'; 
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import { Text, Button, View, StyleSheet } from "react-native";
import type {Node} from 'react';

const Stack = createNativeStackNavigator();

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
          <Stack.Screen 
            name="BirthDate" 
            component={BirthDateScreen} 
          />
          <Stack.Screen 
            name="Horoscope" 
            component={HoroscopeScreen} 
          />
          <Stack.Screen 
            name="Gender" 
            component={GenderScreen} 
          />
          <Stack.Screen 
            name="Location" 
            component={LocScreen} 
          />
          <Stack.Screen 
            name="Photo" 
            component={PhotoScreen} 
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