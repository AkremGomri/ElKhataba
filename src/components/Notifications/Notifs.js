/* eslint-disable prettier/prettier */
import env from '../../../env';
import { View, Text,
  Image, Button, 
  TouchableHighlight, TouchableOpacity   } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { getToken } from '../../services/asyncStorage';
import styles from './styles'
// import Icon from 'react-native-vector-icons/AntDesign';

export default function Notifs(props) {

  const [viewStyle, setViewStyle] = useState(styles.closedNotifCard);
  const [isOpenCard, setIsOpenCard] = useState(false);

  const [ lovePressed, setLovePressed ] = useState(false);
  const [ closePressed, setClosePressed ] = useState(false);

  function heartEventHandler(){
    if ( lovePressed ){
      // props.unlikeClickHandler(props.user);
      setLovePressed(!lovePressed);
    } else {
      // props.likeClickFunction(props.user);
      setLovePressed(!lovePressed);
      setClosePressed(false);
    }
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

      fetch(env.BACKEND_SERVER_URL +':'+ env.PORT+'/notificationsRead/' + props.notif._id, options )
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
        <Image source={{ uri: 'https://makeawebsitehub.com/wp-content/uploads/2019/03/google-url-shortener-alternatives.png'}}  style = {isOpenCard ? styles.image_open : styles.image_closed} />
        <Text numberOfLines={3} ellipsizeMode="tail" style={(isOpenCard) ? styles.text : styles.text_closed }>
          {
            ((props.notif.message).length > 35 && !isOpenCard ) ?
            (((props.notif.message).substring(0, 35-3)) + '...') :
            props.notif.message
          }
          </Text>
        {isOpenCard &&
          <View style={styles.twoBtns}>
            <TouchableOpacity onPress={() => closeEventHandler()} { ...touchCLoseProps}  underlayColor="black">
                <Button title="decline" color="#03b6fc" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => heartEventHandler()}  {...touchHeartProps}>
              <Button title="love back" color="#f194ff" />
            </TouchableOpacity>
          </View>
        }
        </View>
        </TouchableOpacity  >
    </View>
  )
}
