/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Dimensions, StyleSheet,
        Image } from 'react-native';

// import Icon from 'react-native-vector-icons/AntDesign';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get("window");


const Card = ({ source }) => {

  return (
    <View style={{width, height}}>
      <Image source={{ uri: source}}  style = {styles.image} />
      <View style={styles.footer}>
            <View style={[styles.circle, styles.cross]}>
              <Icon name="X" size={32} color="#ec5288" style={ styles.icon }/>
            </View>
            <View style={[styles.circle, styles.heart]}>
              <Icon name="heart" size={32} color="#6ee3b4" />
            </View>
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
      width: 75,
      height: 75,
      borderRadius: 40,
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "gray",
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
