/* eslint-disable prettier/prettier */
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {  ListItem } from 'react-native-elements';
import { useEffect } from 'react';
import Notifs from './../../components/Notifications';
import env from '../../../env';
import { getToken } from '../../services/asyncStorage';

export default function Notification(props) {

    useEffect(() => {
      for(let notif of props.notifs){
        if(notif.isNew == true){
          fetchData(); // only notify backend if there are some new notifications
          break;
        }
      }

      console.warn("item from notifications: ",props.notifs);
      async function fetchData (){
        const token = await getToken();
        let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }

        fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/notificationsSeen", options )
      }
    }, [])
    
  return (
      <FlatList
        data={props.notifs}
        renderItem={({ item }) => ( <Notifs update={props.update} notif={item} /> )}
        keyExtractor={notif => notif._id}
        />
  )
}