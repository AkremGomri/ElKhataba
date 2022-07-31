/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ImageBackground ,AsyncStorage, Alert} from 'react-native';
import React, { useState } from 'react';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
import SelectDropdown from 'react-native-select-dropdown';
import env from '../../../env';

const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const HoroscopeScreen = ({ navigation }) => {
    const  [disable, setDisable] = useState(false);
    const horoscopes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"]
    const [horoscope, setHoroscope] = useState('');
  
   async function onPressHandler(name){
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
        horoscope: horoscope,
      };
      const obj1 = await getToken();
    const options = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(obj1).token,
        },
        body: JSON.stringify(data),
      }

      fetch(env.BACKEND_SERVER_URL + "/ques/"+JSON.parse(obj1).userId, options)
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
        placement: "top",

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
    suivantContainer: {
        width: 100,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 100,
        marginLeft:200,
    },
});

export default HoroscopeScreen;