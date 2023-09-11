/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ImageBackground, TextInput, AsyncStorage, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import env from '../../../../env';
import { getToken, getData } from '../../../services/auth/asyncStorage';
import styles from '../styles';
import { image } from '../../../../assets/images';

const LocScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [disable, setDisable] = useState(false);
  async function onPressHandler(name) {
    setDisable(true);
    const data = {
      city: city,
    };

    const token = await getToken();
    const options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    }
    const userId = (await getData("userId")).value;
    fetch(env.BACKEND_SERVER_URL + "/user/ques/" + userId, options)
      .then((res) => {
        if (city) {
          navigation.push(name);
        }
        else {
          Alert.alert("Il faut saisir votre valeur");
        }
      })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>

        <Text style={styles.topTitle} >Inscrivez-vous gratuitement</Text>
        <Text style={[styles.title, styles.leftTitle]}>Votre Ville</Text>
        <TextInput
          style={styles.body}
          placeholder="entrez ici votre Ville"
          onChangeText={setCity}
          value={city}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
        <Button
          containerStyle={styles.suivantContainer}
          onPress={() => onPressHandler("Photo")}
        >
          <Icon name="forward"
            size={70}
            color="#" />
        </Button>
      </View >
    </ImageBackground>
  )
};


export default LocScreen;