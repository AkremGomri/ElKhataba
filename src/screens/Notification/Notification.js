/* eslint-disable prettier/prettier */
import { View, Text, FlatList, Alert } from 'react-native'
import React from 'react'
import { ListItem } from 'react-native-elements';
import { useEffect } from 'react';
import Notifs from './../../components/Notifications';
import env from '../../../env';
import { getToken } from '../../services/auth/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setNbNotif } from '../../redux/features/notification';

export default function Notification(props) {

  const dispatch = useDispatch();
  const nbNotifs = useSelector(state => {
    return state.notifications.number
  })
  useEffect(() => {
    if (nbNotifs > 0) {
      fetchData() // only notify backend if there are some new notifications
    }


    async function fetchData() {
      const token = await getToken();
      let options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      }

      fetch(env.BACKEND_SERVER_URL + "/user/notificationsSeen", options)
        .then((res) => {
          if (!res.ok) Alert.alert("connection problem")
          else res.json()
            .then((data) => {
              if (data.success) dispatch(setNbNotif(0));
            })
        });
    }
  }, [])

  return (
    <FlatList
      data={props.notifs}
      renderItem={({ item }) => (<Notifs update={props.update} notif={item} />)}
      keyExtractor={notif => notif._id}
    />
  )
}