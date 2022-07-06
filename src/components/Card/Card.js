/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Dimensions, StyleSheet,
        Image, TouchableHighlight,TouchableOpacity,
        Alert  } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
// import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Hoverable from "./Hoverable";

const { width, height } = Dimensions.get("window");


const Card = ({ source, fullname, gender }) => {

  return (
    <View style={{width, height}}>
      <Image source={{ uri: source}}  style = {styles.image} />
      <View style={styles.footer}>
            <TouchableOpacity onPress={() => Alert.alert(gender)} style={[styles.circle, styles.cross]} underlayColor="black">
                <Icon name="close" size={60} color="rgba(10,10,10,1)" style={ styles.icon }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert(fullname)} style={[styles.circle, styles.heart]}>
              <Icon name="heart" size={32} color="#6ee3b4" />
            </TouchableOpacity>
      </View>
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
      top: -250,
      width: 90,
      height: 90,
      borderRadius: 60,
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
      shadowColor: "gray",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 2,
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

    }
  });

export default Card;
