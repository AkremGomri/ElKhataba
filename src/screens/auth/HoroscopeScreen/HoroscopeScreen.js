/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ImageBackground ,AsyncStorage, Alert} from 'react-native';
import React, { useState } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import SelectDropdown from 'react-native-select-dropdown';
import env from '../../../../env';
import { getToken ,getData} from '../../../services/auth/asyncStorage';
import styles from '../styles';
import { image } from '../../../../assets/images';

const HoroscopeScreen = ({ navigation }) => {
    const  [disable, setDisable] = useState(false);
    const horoscopes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"]
    const [horoscope, setHoroscope] = useState('');
  
   async function onPressHandler(name){
    setDisable(true);

    const data = {
        horoscope: horoscope,
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
      const userId= (await getData("userId")).value;
      fetch(env.BACKEND_SERVER_URL +"/ques/"+userId, options)
      .then((res) => {
        if (horoscope){
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
        <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
            <View style={ styles.container }>

                <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
                <Text style={ [styles.title, styles.leftTitle] }>Votre Horoscope</Text>
            <SelectDropdown 
                value={horoscope}
                    data={ horoscopes }
                    onSelect={ (selectedItem, index) => {
                        console.log(selectedItem, index);;
                        setHoroscope(selectedItem);
                    } }
                    buttonTextAfterSelection={ (selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    } }
                    rowTextForSelection={ (item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    } }
                />
      
                
                <Button
                    containerStyle={ styles.suivantContainer }
                    onPress={() => onPressHandler("Gender")}
                    >
                    <Icon name="forward"
                        size={ 70 }
                        color="#" />
                </Button>
            </View >
        </ImageBackground>
    )
};

export default HoroscopeScreen;