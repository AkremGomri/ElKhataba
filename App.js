/* eslint-disable prettier/prettier */
// import at the very top of everything.
import "./ignoreWarnings";
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from "./src/screens/SettingScreen";
import EditScreen from './src/screens/EditScreen';
import UserProfileScreen from "./src/screens/UserProfileScreen";
import PhotoScreen from './src/screens/PhotoScreen/PhotoScreen'
import LocScreen from './src/screens/LocScreen';
import GenderScreen from './src/screens/GenderScreen';
import HoroscopeScreen from './src/screens/HoroscopeScreen';
import BirthDateScreen from './src/screens/BirthDateScreen';
import WelcomeScreen from './src/screens/WelcomeScreen'; 
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { Text, Button, View, StyleSheet ,AsyncStorage} from "react-native";
import type {Node} from 'react';

const Stack = createNativeStackNavigator();

const App: () => Node = ({navigation}) => {
  
  return (
    //<LocScreen /> 
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
            name="Home" 
            component={HomeScreen} 
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
          <Stack.Screen 
            name="Profile" 
            component={UserProfileScreen} 
          />
            <Stack.Screen 
            name="Modifier Profil" 
            component={EditScreen} 
          />
          <Stack.Screen 
            name="Paramètres" 
            component={SettingScreen} 
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