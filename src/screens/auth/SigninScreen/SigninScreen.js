/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View,
   Text,TouchableOpacity,
  Image,
  TextInput,
  Alert,ImageBackground,
  FlatList,
  } from 'react-native';
import AsyncStorage from '../../../services/auth/asyncStorage';
import Button from 'react-native-button';
import { useState, useEffect } from 'react';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import env from '../../../../env';
import styles from '../styles';
import { image, logoFb } from '../../../../assets/images/index';

const SigninScreen = ({ navigation }) => {

  
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

const onSignInPressed= async () => {

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
if ( (!email) || (!password) ) {
  return alert.Alert("L'un des champs n'est pas saisi.Veuillez trouvez votre compte pour se connecter.")
}
else {

  fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/login", options)
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
          console.warn("error: " + response.error);
          if(response.error){
            return alert.Alert("vérifier l'email et le mot de passe: ", response.error);
          } else {
            /* safa */
            // console.log(data);
            // storeToken(JSON.stringify(data));
            // return navigation.push("BirthDate");
            /* safa */
            console.warn("data: ",data);
            AsyncStorage.storeToken(data.token);
            AsyncStorage.storeData("userId" ,data.userId);
            return navigation.push("BirthDate");
          }
        })
      }
      })
    .catch((err) => alert.Alert("problem connecting to the server: " + err))
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
      onPress={() => onSignInPressed()}>
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
    
    {/* <FlatList
        data={data}
        renderItem={({ item, index, separators }) => <Text item={item} > {item.email} </Text>}
        keyExtractor={item => item._id}
      /> */}
    { response.message && <Text>{response.message}</Text> }
    { response.error && <Text>erreur</Text> }
    
  </View>
    </ImageBackground>
    
  )
};



export default SigninScreen;