/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet,
    Alert, ImageBackground ,AsyncStorage} from 'react-native'
import React, { useState,useEffect } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getToken ,getData} from '../../../services/auth/asyncStorage';
import { getUser} from '../../../services/auth/userService';
import env from '../../../../env';
import styles from '../styles';
import { image } from '../../../../assets/images';

const BirthDateScreen = ({ navigation }) => {
    const [disable, setDisable] = useState(false);
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const [user, setUser] = useState('');
    /* useEffect(() => {
        
        const effect=async()=> {
          var x= await getUser();
           console.warn("user:",x);
           x.date_of_birth ? navigation.push('Horoscope') : null;

        }
        effect();

      }, []); */
   
    async function  onPressHandler(name) {
        setDisable(true);
      
        const data = { 
            date_of_birth: date,
          };
          const token=await getToken();
        const options = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +token,
            },
            body: JSON.stringify(data),
          }
          const userId= (await getData("userId")).value;
          fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/ques/"+userId, options)
          .then((res) => {
            if (date){
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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };
    
    return ( 
          <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
                <View style={ styles.container }>
    
                    <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
                    <Text style={ [styles.title, styles.leftTitle] }>Votre Date de naissance</Text>
    
                    <Button onPress={ showDatePicker } >
                        choisir une date
                    </Button>
                    <DateTimePickerModal
                        isVisible={ isDatePickerVisible }
                        mode="date"
                        onConfirm={ handleConfirm }
                        onCancel={ hideDatePicker }
                    />
                    <Button
                        containerStyle={ styles.suivantContainer }
                        onPress={ () => onPressHandler("Horoscope") }
                    >
                        <Icon name="forward"
                            size={ 70 }
                            color="#" />
                    </Button>
                </View >
            </ImageBackground>
    )
                
         
   
};


export default BirthDateScreen