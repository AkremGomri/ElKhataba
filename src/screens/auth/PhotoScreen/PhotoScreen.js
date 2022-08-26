/* eslint-disable prettier/prettier */
import {
  View, Text, StyleSheet, ImageBackground, Image,
  ImagePickerIOS, AsyncStorage, TouchableOpacity,
  Alert
} from 'react-native'
import React, { useState, useRef ,useEffect} from 'react';
import ImagePicker from '../../../components/common/ImagePicker2';
//import * as ImagePicker from 'react-native-image-picker';
//import { launchImageLibrary } from 'react-native-image-picker';
import env from '../../../../env';
import { getToken, getData } from '../../../services/auth/asyncStorage';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageComponent from '../../../components/image/ImageComponent';
import styles from '../styles';
import { image ,DefaultMan,DefaultWoman} from '../../../../assets/images';

const PhotoScreen = ({ navigation }) => {
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);
  const [disable, setDisable] = useState(false);
  const [Photo, setPhoto] = useState('');
  const [user, setUser] = useState('');
  useEffect(() => {
      getUser();
    }, []);
 
    async function getUser() {
    const options = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const userId= (await getData("userId")).value;
    fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+'/'+userId, options)
        .then(response =>response.json())
           .then(data =>{
              setUser(data);
              console.log(user);
               
  })
        .catch((err) => Alert.alert("problem connecting to the server: " + err))

    }
  const onFileSelected = (image) => {
    console.log("c'est l'image choisie", image);
    closeSheet();
    setLocalFile(image);
    setPhoto(image["path"]);
    console.log(Photo);
    setUploadSucceeded(true);
  };
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  async function onPressHandler(name) {
    setDisable(true);
    const data1 = {
      Photo: Photo
    };

    const token = await getToken();
    const options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data1),
    }
    const userId = (await getData("userId")).value;
    fetch(env.BACKEND_SERVER_URL + ":" + env.PORT + "/ques/" + userId, options)
      .then((res) => {
        console.log("hethi el reponse", res);
        navigation.push(name);
      })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }



  const renderFile = () => {
    if (Photo != "") {
      return <ImageComponent
        src={Photo}
      />
    } else {
      return  ((user.gender==="femme" ) ? <Image source={DefaultWoman} style={styles.detailPhoto}/> :
      <Image source={DefaultMan} style={styles.detailPhoto}/>    
       )

    }
  }
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      <View style={styles.container}>
        <Text style={styles.topTitle} >Inscrivez-vous gratuitement</Text>
        <Text style={[styles.title, styles.leftTitle]}>Votre Photo</Text>

        {renderFile()}
        <TouchableOpacity onPress={() => openSheet()} style={[styles.signupContainer, { marginTop: 50 }]}  >

          <Text style={styles.signupText} >Select File</Text>
        </TouchableOpacity>
        <Button
          containerStyle={styles.suivantContainer}
          onPress={() => onPressHandler("Recommandation")}>
          <Icon name="forward"
            size={70}
          />
        </Button>
        <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
      </View>

    </ImageBackground>
  )
};


export default PhotoScreen

