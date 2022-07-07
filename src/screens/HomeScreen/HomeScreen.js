/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, 
  Dimensions, FlatList, Image, 
  StyleSheet} from 'react-native';
  import { Button, Icon } from 'react-native-elements'

import { useState, useEffect } from 'react';
import useEffectFetch from './../../services/useEffectFetch';
import env from '../../../env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card/Card';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const { width, height } = Dimensions.get("window");
// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  function reactedTo(){

  }
  
  // const options = 
  const {data, isPending, error} = useEffectFetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/recommanded", );
  return (
    <SafeAreaView >
          {/* <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator> */}
        <ScrollView snapToInterval={height} decelerationRate="fast" horizontal >
          <FlatList
          snapToInterval={height}
           horizontal
            data={data}
            renderItem={
            ({ item }) => <Card source= { item.Photo } fullname= {item.fullname} gender= { item.gender} />
            }
            keyExtractor={item => item._id}
          />
          {/* style = {{ width, height:height/2 }}  */}
        </ScrollView>
    </SafeAreaView> 
  )
}



export default HomeScreen;