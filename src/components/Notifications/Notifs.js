/* eslint-disable prettier/prettier */
import env from '../../../env';
import { View, Text, StyleSheet,
  Dimensions, Image, Button, 
  TouchableHighlight, TouchableOpacity   } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { getToken } from '../../services/asyncStorage';
const { width, height } = Dimensions.get("window");
const lettersMaxLimit = 45;


export default function Notifs(props) {
  const onPressHandler =() => {
    console.warn("notifssss: ",props.notif._id);
      if(props.notif.isRead == false){
        console.warn("test: ",props.notif.isRead);
        fetchData(); // only notify backend if there are some new notifications
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

      fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/notificationsRead/" + props.notif._id, options )
        .then(res => res.json())
        .then(data => {
          console.warn("dataaaa: ",data)
          console.warn("props.notif: ",props.notif)
          if(data.afterChange && !data.beforeChange) {
            props.update(props.notif._id, "isRead", true) 
          }
      })
        .catch(err => console.log("err: ",err))
    }
  }
  return (
    <View style={[styles.NotifCards,(props.notif.isRead)? styles.isNotReadBackground: styles.isReadBackground]}>
      <TouchableOpacity onPress={onPressHandler} >
        <View>
        <Image source={{ uri: "https://makeawebsitehub.com/wp-content/uploads/2019/03/google-url-shortener-alternatives.png"}}  style = {styles.image} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>
          {props.notif.message}
          { ((props.notif.message).length > lettersMaxLimit) ? 
            (((props.notif.message).substring(0,lettersMaxLimit-3)) + '...') : 
            props.notif.message
          }
          </Text>
        </View>
        </TouchableOpacity  >
    </View>
  )
}

const styles = StyleSheet.create({
  NotifCards: {
    marginTop: 4,
    padding: 1,
    height: height/10,
    backgroundColor:  "#ADD8E6",
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    overflow: 'hidden',
    width: width,
    
  },
  isReadBackground: {
    backgroundColor: "#33E9FF"
  },
  // isNotReadBackground: {
  //   backgroundColor: "#33E9FF"
  // },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 5,
    // flexShrink: 1,
    // textOverflow: "ellipses",
    // wordWrap: "breakWord"

  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 400/2,
    overflow: 'hidden' 

  }
})