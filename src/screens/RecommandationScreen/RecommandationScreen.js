/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, 
  Dimensions, FlatList, Image, 
  StyleSheet} from 'react-native';
  // import { Button, Icon } from 'react-native-elements'

import { useState, useEffect } from 'react';
import useEffectFetch from '../../services/useEffectFetch';
import env from '../../../env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card/Card';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './../HomeScreen/';
import SigninScreen from './../SigninScreen/SigninScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import OnConstruction from '../OnConstruction/';

const { width, height } = Dimensions.get("window");
const Tabs = createBottomTabNavigator();

const RecommandationScreen = () => {

  return (
      <Tabs.Navigator initialRouteName="Home" 
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: 'rgba(161, 16, 59, 0.8)',
       activeBackgroundColor: 'rgba(0,0,0,0.2)',
      }}
      tabBar={props => (
        <View style={{ position: 'absolute', left: -8, bottom: 0, right: 0 }}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarStyle: {backgroundColor: 'transparent',
        elevation: 0,},
      }}
      >

        <Tabs.Screen name='notifications' component={OnConstruction} options={{ tabBarBadge:3 ,tabBarIcon: ({ color, size }) => (
          <IconFeather name="bell" color={color} size={36} />
          ), }}/>

        <Tabs.Screen name='Home' backBehavior="firstRoute" component={HomeScreen} 
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,  
            tabBarIcon: ({ color, size }) => (
              <IconAntDesign name="home" color={color} size={36} />
              ), }}/>

        <Tabs.Screen name='Matches' component={OnConstruction} options={{headerShown: false,  tabBarIcon: ({ color, size }) => (
          <IconCommunity name="ring" color={color} size={36} />
          ), }}/>

        <Tabs.Screen name='messages' component={OnConstruction} options={{headerShown: false,  tabBarIcon: ({ color, size }) => (
              <IconFeather name="message-square" color={color} size={36} />
              ), }}/>

        <Tabs.Screen name='profile' component={OnConstruction} options={{headerShown: false,  tabBarIcon: ({ color, size }) => (
              <IconCommunity name="account-circle" color={color} size={36} />
              ), }}/>

              
              
        </Tabs.Navigator>
  )
}



export default RecommandationScreen;