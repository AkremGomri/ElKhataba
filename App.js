/* eslint-disable prettier/prettier */
// import at the very top of everything.
import './ignoreWarnings';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Link} from 'react-router-dom';
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
import RecommandationScreen from './src/screens/RecommandationScreen';
import MatchesScreen from './src/screens/Matches/MatchesScreen';
import Chat from './src/screens/Chat/Chat';
import Discussion from './src/screens/Chat/Discussion';
import {options} from './options';

import type {Node} from 'react';

const Stack = createNativeStackNavigator();

const App: () => Node = ({navigation}) => {

  return (
    <NavigationContainer style={styles.root}>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={options}
          
        />
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={options}
        />
        <Stack.Screen name="SignUp" component={SignupScreen} 
        options={options}/>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home', 
            headerLeft: props => undefined,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name="BirthDate" component={BirthDateScreen} options={options}/>
        <Stack.Screen name="Horoscope" component={HoroscopeScreen}  options={options}/>
        <Stack.Screen name="Gender" component={GenderScreen} options={options} />
        <Stack.Screen name="Location" component={LocScreen} options={options} />
        <Stack.Screen name="Photo" component={PhotoScreen} options={options} />
        <Stack.Screen name="Profile" component={UserProfileScreen} options={options} />
        <Stack.Screen name="Modifier Profil" component={EditScreen} options={options} />
        <Stack.Screen name="Paramètres" component={SettingScreen} options={options} />
        <Stack.Screen
          name="Recommandation"
          component={RecommandationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Chat"component={Chat} options={options} />
        <Stack.Screen name="Discussion"component={Discussion} options={options} />
        <Stack.Screen name="Matches"component={MatchesScreen} options={options} />
        
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
