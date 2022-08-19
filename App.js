/* eslint-disable prettier/prettier */
// import at the very top of everything.
import './ignoreWarnings';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Button, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Link} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from './src/screens/profile/SettingScreen';
import EditScreen from './src/screens/profile/EditScreen';
import UserProfileScreen from './src/screens/profile/UserProfileScreen';
import PhotoScreen from './src/screens/auth/PhotoScreen/PhotoScreen';
import LocScreen from './src/screens/auth/LocScreen';
import GenderScreen from './src/screens/auth/GenderScreen/GenderScreen';
import HoroscopeScreen from './src/screens/auth/HoroscopeScreen/HoroscopeScreen';
import BirthDateScreen from './src/screens/auth/BirthDateScreen/BirthDateScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import SigninScreen from './src/screens/auth/SigninScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
// import { Text, Button, View, StyleSheet ,AsyncStorage} from "react-native";
import RecommandationScreen from './src/screens/RecommandationScreen';

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
          options={{title: 'Welcome', headerLeft: props => null}}
        />
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="SignUp" component={SignupScreen} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerLeft: props => undefined,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name="BirthDate" component={BirthDateScreen} />
        <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Location" component={LocScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
        <Stack.Screen name="Profile" component={UserProfileScreen} />
        <Stack.Screen name="Modifier Profil" component={EditScreen} />
        <Stack.Screen name="Paramètres" component={SettingScreen} />
        <Stack.Screen
          name="Recommandation"
          component={RecommandationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
