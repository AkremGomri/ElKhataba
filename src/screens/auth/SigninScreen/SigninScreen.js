/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useContext } from 'react';
import { View,
   Text,TouchableOpacity,
  Image,
  TextInput,
  Alert,ImageBackground,
  FlatList,
  } from 'react-native';
import io from "socket.io-client"
import AsyncStorage from '../../../services/auth/asyncStorage';
import Button from 'react-native-button';
import { useState, useEffect } from 'react';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import env from '../../../../env';
import styles from '../styles';
import { image, logoFb } from '../../../../assets/images/index';
import { Context } from '../../../services/context/Context';
import { useDispatch } from 'react-redux';
import { setIAmConnected } from './../../../redux/features/SocketIO';

const SigninScreen = ({ navigation }) => {

  const [context, setContext] = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [response, setResponse] = useState('')
//  const  storeToken= async(user)  =>{
//     try {
//        await AsyncStorage.setItem("userData", JSON.stringify(user));
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   }
   
const [response, setResponse] = useState('');
const dispatch = useDispatch();

const onSignInPressed= async (e) => {

  if ( (!email) || (!password) ) {
    return Alert.alert("L'un des champs n'est pas saisi.Veuillez trouvez votre compte pour se connecter.")
  }
  else {
  const data = { 
        email: email,
        password: password,
      };
      
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  fetch(env.BACKEND_SERVER_URL+"/login", options)
    .then((res) =>  {
     
      if(res.status === 500){
        Alert.alert("alerte saisie","vérifier la connection s'il vous plait: ", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
      }  else{
        res.json()
        .then((data) => {
          setResponse(data);
          if(response.error){
            return Alert.alert("vérifier l'email et le mot de passe: ", response.error);
          } else {

            console.warn("data: ",data);
            AsyncStorage.storeToken(data.token);
            AsyncStorage.storeData("userId" ,data.userId);

            const socket = io(env.BACKEND_SERVER_URL, {
              query: {token: data.token},
          });
          dispatch(setIAmConnected(true))
          setContext(socket);

            return navigation.replace("AppNavigator");
          }
        })
      }
      })
    .catch((err) => Alert.alert("problem connecting to the server: " + err))
}
  

};
const onPressFacebook=()=>{
  console.warn('login with fb');
}
  return (
    <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
<View style={styles.container}>
    <Text style={[styles.title, styles.leftTitle]}>Connectez-vous ici</Text>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        placeholder="Email ou Pseudonyme"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        secureTextEntry={true}
        placeholder="mot de passe"
        onChangeText={setPassword}
        value={password}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <Button
      containerStyle={styles.loginContainer}
      style={styles.loginText}
      onPress={onSignInPressed}>
      Se connecter
    </Button>
    <Text style={styles.or}>OU</Text>
    
          <Image  onPress={()=>onPressFacebook()} source={logoFb} style={styles.facebookContainer} />
       
   {/*  <Button
      containerStyle={styles.facebookContainer}
      style={styles.facebookText}
      onPress={() => onPressFacebook()}>
      Se connecter via FaceBook.
    </Button> */}
    
    { response.message && <Text>{response.message}</Text> }
    { response.error && <Text>erreur</Text> }
    
  </View>
    </ImageBackground>
  )
};



export default SigninScreen;