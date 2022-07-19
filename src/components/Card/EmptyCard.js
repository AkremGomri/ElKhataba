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


const EmptyCard = () => {
  return (
    <View style={{width, height}}>
      <Text style={ styles.text }>{ "end of suggestions" }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      position:"absolute",
      top: height /3,
      width: width,
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      fontSize: 40
    }
  });

export default EmptyCard;
