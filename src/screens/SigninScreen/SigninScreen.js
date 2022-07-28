/* eslint-disable prettier/prettier */
import React from 'react';
import { View,
   Text, 
  Image, 
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  AsyncStorage  } from 'react-native';
  import Button from 'react-native-button';
import { useState, useEffect } from 'react';
import {AppStyles} from '../../AppStyles';
// import useFetch from './../../services/useFetch';

const SigninScreen = ({ navigation }) => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState('')
 const  storeToken= async(user)  =>{
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
   
const onSignInPressed=() => {
  
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

  fetch("http://192.168.1.17:8800/login", options)
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
            console.log(data);
            storeToken(JSON.stringify(data));
            return navigation.push("Profile");
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
    <Button
      containerStyle={styles.facebookContainer}
      style={styles.facebookText}
      onPress={() => onPressFacebook()}>
      Se connecter via FaceBook.
    </Button>
    
    {/* <FlatList
        data={data}
        renderItem={({ item, index, separators }) => <Text item={item} > {item.email} </Text>}
        keyExtractor={item => item._id}
      /> */}
    { response.message && <Text>{response.message}</Text> }
    { response.error && <Text>erreur</Text> }
    
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
});

export default SigninScreen;