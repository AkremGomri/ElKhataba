/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet,
    Alert, ImageBackground ,AsyncStorage} from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import DatePicker from '@react-native-community/datetimepicker';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const BirthDateScreen = ({ navigation }) => {
    const [disable, setDisable] = useState(false);
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    async function  onPressHandler(name) {
        setDisable(true);
        const getToken=async () =>{
            try {
              let userData = await AsyncStorage.getItem("userData");
              let obj = JSON.parse(userData);
              console.log("hetha el obj");
              console.log(obj);
              return obj;
            } catch (error) {
              console.log("Something went wrong", error);
            }
          }
      
      
        const data = { 
            date_of_birth: date,
          };
          const obj1=await getToken();
        const options = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + JSON.parse(obj1).token,
            },
            body: JSON.stringify(data),
          }
         
          fetch("http://192.168.1.17:8800/ques/"+JSON.parse(obj1).userId, options)
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    topTitle: {
        marginTop: 10,
        marginBottom: 50,
        fontSize: 30,
        fontStyle: "italic",
        fontWeight: 'bold',
        color: 'black',
        placement: "top"

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 100,
        marginBottom: 50,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },
    loginText: {
        color: AppStyles.color.white,
    },
    placeholder: {
        color: 'red',
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    datePickerStyle: {
        width: 230,
        fontSize: 500,
        marginTop: 40,

    },
    suivantContainer: {
        width: 100,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginLeft: 200,
    },
});

export default BirthDateScreen