/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, 
  Dimensions, FlatList, Image, 
  StyleSheet, Alert, } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { getToken } from '../../services/auth/asyncStorage';
import { useState, useEffect } from 'react';
import useEffectFetch from '../../services/useEffectFetch';
import env from '../../../env';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card/Card';
import EmptyCard from '../../components/Card/EmptyCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const { width, height } = Dimensions.get("window");
// const Tab = createBottomTabNavigator();
var options = {};

const HomeScreen = () => {
  const [ usersList, setUsersList] = useState([]);
  function reactedTo(){
  }

 
  // const {data, isPending, error, setData} = useEffectFetch(env.BACKEND_SERVER_URL +"/recommanded", options );

  useEffect(() => {
    async function fetchData (){
      const token = await getToken();
      options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      }

      fetch(env.BACKEND_SERVER_URL +"/recommanded", options )
        .then((res) => {
          res.json()
            .then((data) => {
              console.log(data);
              setUsersList(data);
            })
        })
    }
    fetchData();
  }, [])
  


  async function removeItem(user) {
    options = { 
      ...options,
      method: 'POST',
    }
    setUsersList(usersList.filter((item, index) => {
      return item._id != user._id;
    }));
    const res = await fetch(env.BACKEND_SERVER_URL +"/declineSuggestion/"+user._id, options );
    console.warn("user._id: ", user._id);
    console.warn("removeItem's data 2: ", usersList);
  }

  async function likeUser(user) {
    options = { 
      ...options,
      method: 'POST',
    }
    const res = await fetch(env.BACKEND_SERVER_URL +"/like/"+user._id, options );
  }

  async function unlikeClickHandler(user) {
    options = { 
      ...options,
      method: 'POST',
    }
    const res = await fetch(env.BACKEND_SERVER_URL +"/unlike/"+user._id, options );
  }

  async function undislikeClickHandler(user) {
    options = { 
      ...options,
      method: 'POST',
    }
    const res = await fetch(env.BACKEND_SERVER_URL +"/undislike/"+user._id, options );
  }

  return (

<SafeAreaView >
          {/* <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator> */}
{/* 
        <ScrollView snapToInterval={width} decelerationRate="fast" horizontal > */}
          <FlatList
          snapToInterval={width}
           horizontal
            data={usersList}
            renderItem={
            ({ item }) => <Card source= { item.Photo } user = {item} closeClickFunction = {removeItem} likeClickFunction = {likeUser} unlikeClickHandler = {unlikeClickHandler} undislikeClickHandler={undislikeClickHandler}/>
            }
            ListEmptyComponent = {EmptyCard}
            initialNumToRender
            keyExtractor={item => item._id}
            onEndReachedThreshold={0.5}
          />
          {/* style = {{ width, height:height/2 }}  */}
   {/*      </ScrollView>  */}
    </SafeAreaView> 
  )
}



export default HomeScreen;