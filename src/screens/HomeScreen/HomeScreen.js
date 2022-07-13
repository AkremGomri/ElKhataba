/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, 
  Dimensions, FlatList, Image, 
  StyleSheet} from 'react-native';
  import { Button, Icon } from 'react-native-elements';
import getToken from '../../services/asyncStorage';
import { useState, useEffect } from 'react';
import useEffectFetch from './../../services/useEffectFetch';
import env from '../../../env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card/Card';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const { width, height } = Dimensions.get("window");
// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [ usersList, setUsersList] = useState([]);
  function reactedTo(){

  }
 
  // const {data, isPending, error, setData} = useEffectFetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/recommanded", options );

  useEffect(() => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + getToken(),
      }
    }

    fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/recommanded", options )
      .then((res) => {
        res.json()
          .then((data) => {
            setUsersList(data);
          })
      })
    
  }, [])
  


  function removeItem(user) {
    setUsersList(usersList.filter((item, index) => {
      return item._id != user._id;
    }))
    console.warn("user._id: ", user._id);
    console.warn("removeItem's data 2: ", usersList);

  }
  return (
    <SafeAreaView >
          {/* <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator> */}
        <ScrollView snapToInterval={width} decelerationRate="fast" horizontal >
          <FlatList
          snapToInterval={width}
           horizontal
            data={usersList}
            renderItem={
            ({ item }) => <Card source= { item.Photo } user = {item} closeClickFunction = {removeItem} />
            }
            keyExtractor={item => item._id}
          />
          {/* style = {{ width, height:height/2 }}  */}
        </ScrollView>
    </SafeAreaView> 
  )
}



export default HomeScreen;