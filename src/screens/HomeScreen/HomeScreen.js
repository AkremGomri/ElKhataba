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

const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const {data, isPending, error} = useEffectFetch(env.BACKEND_SERVER_URL +":"+ env.PORT);
  return (
    <SafeAreaView >
        <ScrollView snapToInterval={height} decelerationRate="fast" horizontal nestedScrollEnabled={true}>
          <FlatList
          snapToInterval={height}
           horizontal
            data={data}
            renderItem={
            ({ item }) => <Card source= { item.Photo }  />
            }
            keyExtractor={item => item._id}
          />
          {/* style = {{ width, height:height/2 }}  */}
        </ScrollView>
    </SafeAreaView> 
  )
}



export default HomeScreen;