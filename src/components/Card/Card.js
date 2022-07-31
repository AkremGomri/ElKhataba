/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { View, Dimensions, StyleSheet,
        Image, TouchableHighlight,TouchableOpacity,
        Alert, Text  } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
// import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Hoverable from "./Hoverable";
import { useEffect } from 'react';

const { width, height } = Dimensions.get("window");


const Card = (props) => {

  useEffect(() => {
    if(props.user.allreadyLiked){
      setLovePressed(!lovePressed);
    } else if (props.user.allreadyRefused){
      setClosePressed(!closePressed);
      
    }
  },[])

  const [ lovePressed, setLovePressed ] = useState(false);
  const [ closePressed, setClosePressed ] = useState(false);

  function heartEventHandler(){
    if ( lovePressed ){
      props.unlikeClickHandler(props.user);
      setLovePressed(!lovePressed);
    } else {
      props.likeClickFunction(props.user);
      setLovePressed(!lovePressed);
      setClosePressed(false);
    }
  }

  function closeEventHandler() {
    if ( closePressed ){
      setClosePressed(!closePressed);
      props.undislikeClickHandler(props.user);
    } else {
      props.closeClickFunction(props.user);
      setClosePressed(!closePressed);
      setLovePressed(false);
    }
  }

  var touchCLoseProps = {
    style: closePressed ? [styles.circle, styles.cross, styles.circlePressed] : [styles.circle, styles.cross, styles.circleNotPressed]
  }

  var touchHeartProps = {
    style: lovePressed ? [styles.circle, styles.heart, styles.circlePressed] : [styles.circle, styles.heart, styles.circleNotPressed] 
  }

  return (
    <View style={{width, height}}>
      {
        props.source? <Image source={{ uri: props.source}}  style = {styles.image} /> : <Image source={require("../../../assets/images/user.png")} style = {styles.image}/>
      }
      <View style={styles.footer}>
            <TouchableOpacity  onPress={() => closeEventHandler()} { ...touchCLoseProps}  underlayColor="black">
                <Icon name="close" size={60} color={closePressed? "rgba(10,10,10,1)": "rgba(10,10,10,0.5)"} style={ styles.icon }/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => heartEventHandler()}  {...touchHeartProps}>
              <Icon name = {lovePressed? "heart": "hearto"} size={45} color="red" />
            </TouchableOpacity>
      </View>
      <Text style={ styles.text }>{ props.user.fullname }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fbfaff",
      justifyContent: "space-evenly",
    },
    header: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
    },
    cards: {
      width,
      height,
      marginLeft: 16,
    },
    footer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 16,
    },
    circle: {
      position: 'absolute',
      top: -300,
      width: 90,
      height: 90,
      borderRadius: 60,
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "gray",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 2,
    },

    circlePressed:{
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    circleNotPressed: {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    heart: {
      left: (Dimensions.get('window').width / 2) + 40 ,

    },
    cross: {
      left: (Dimensions.get('window').width / 2) - 120 ,

    },

    image: {
      width, 
      height: height,
      top: 0,

    },
    icon: {

    },
    text: {
      position:"absolute",
      top: height - (height*2.2/8),
      width: width,
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      fontSize: 40
    }
  });

export default Card;
