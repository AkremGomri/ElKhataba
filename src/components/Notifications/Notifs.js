/* eslint-disable prettier/prettier */
import env from '../../../env';
import { View, Text,
  Image, Button, 
  TouchableHighlight, TouchableOpacity   } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { getToken } from '../../services/auth/asyncStorage';
import styles from './styles'
// import Icon from 'react-native-vector-icons/AntDesign';

export default function Notifs(props) {

  const [viewStyle, setViewStyle] = useState(styles.closedNotifCard);
  const [isOpenCard, setIsOpenCard] = useState(false);

  const [ lovePressed, setLovePressed ] = useState(false);
  const [ closePressed, setClosePressed ] = useState(false);
  async function fetchDataLike(n){
    const token = await getToken();
    options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }

    const res=await fetch(env.BACKEND_SERVER_URL +"/like/", options )
      console.log("the resp of the love back:",await res.json());
  }
  function heartEventHandler(n){
   console.log("love pressed:",lovePressed);
   fetchDataLike(n);
   setLovePressed(true);
   setClosePressed(false);
  }

  function closeEventHandler() {
    if ( closePressed ){
      setClosePressed(!closePressed);
      // props.undislikeClickHandler(props.user);
    } else {
      // props.closeClickFunction(props.user);
      setClosePressed(!closePressed);
      setLovePressed(false);
    }
  }

  var touchHeartProps = {
    style: [
      lovePressed ? [styles.circlePressed] : [styles.circleNotPressed], 
      styles.btn,
      styles.acceptBtn,
     ]
  }

  var touchCLoseProps = {
    style: [
      closePressed ? [styles.circlePressed] : [styles.circleNotPressed],
      styles.btn,
      styles.declineBtn,
    ]
  }

  const onPressHandler =() => {
      if(props.notif.isRead == false){
        console.warn('test: ',props.notif.isRead);
        fetchData(); // only notify backend if there are some new notifications
      }

    async function fetchData (){
      const token = await getToken();
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      }

      fetch(env.BACKEND_SERVER_URL +'/notificationsRead/' + props.notif._id, options )
        .then(res => res.json())
        .then(data => {
          console.warn('dataaaa: ',data)
          console.warn('props.notif: ',props.notif)
          if(data.afterChange && !data.beforeChange) {
            props.update(props.notif._id, 'isRead', true) 
          }
      })
        .catch(err => console.log('err: ',err))
    }
    setIsOpenCard(!isOpenCard);
    setViewStyle( (!isOpenCard) ? styles.openedNotifCard : styles.closedNotifCard);
  }

  return (
    <View style={[viewStyle ,(props.notif.isRead)? styles.isReadBackground: styles.isNotReadBackground,  ]}>
      <TouchableOpacity onPress={onPressHandler} >
        <View style={styles.textAndImageContainer}>
        <Image source={{ uri: props.notif.senderPhoto}}  style = {isOpenCard ? styles.image_open : styles.image_closed} />
        <Text numberOfLines={3} ellipsizeMode="tail" style={(isOpenCard) ? styles.text : styles.text_closed }>
          {
            ((props.notif.message).length > 35 && !isOpenCard ) ?
            (((props.notif.message).substring(0, 35-3)) + '...') :
            props.notif.message
          }
          </Text>
        </View>
        </TouchableOpacity  >
        {isOpenCard &&
          <View style={styles.twoBtns}>
            <TouchableOpacity onPress={() => closeEventHandler()} { ...touchCLoseProps}  underlayColor="black">
              <Button title="decline" color="#03b6fc" />
            </TouchableOpacity>
            <TouchableOpacity   {...touchHeartProps}>
              <Button onPress={() => heartEventHandler(props.notif)} title="love back" color="#f194ff" />
            </TouchableOpacity>
          </View>
        }
    </View>
  )
}
