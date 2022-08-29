/* eslint-disable prettier/prettier */
import { View, Text, FlatList, Alert } from 'react-native'
import React from 'react'
import {  ListItem } from 'react-native-elements';
import { useEffect } from 'react';
import Notifs from './../../components/Notifications';
import env from '../../../env';
import { getToken } from '../../services/auth/asyncStorage';

export default function Notification(props) {

    useEffect(() => {
      console.warn("nbNotifs: ",props.nbNotifs);
      if(props.nbNotifs>0){
        fetchData() // only notify backend if there are some new notifications
      }


      async function fetchData (){
        const token = await getToken();
        let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }

        fetch(env.BACKEND_SERVER_URL +"/notificationsSeen", options )
          .then((res) => {
            if(!res.ok) Alert.alert("connection problem")
            else res.json()
              .then((data) => {
                if(data.success) props.setNbNotifs(0);
              })
          });
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