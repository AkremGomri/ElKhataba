/* eslint-disable prettier/prettier */
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();


import type {Node} from 'react';


const App: () => Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthScreen">
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
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


export default App;
