/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React ,{useState} from 'react'
import {AppStyles} from '../../AppStyles';
import Button from 'react-native-button';

const SignupScreen = ({ navigation }) => {

  const [fullname, setFullname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const onRegister = () => {
    const data = { 
      fullname: fullname,
      email: email,
      pseudo: pseudo,
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
  
    fetch("http://192.168.1.17:8080/signup", options)
      .then((res) =>  res.json())
      .then((data) => {
        setResponse(data);
        if(response.error){
          Alert.alert("vous n'êtes pas enregistré: " )
        } else {
          navigation.push("SignIn");
        }
      })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
  }
  return (
    <View style={styles.container}>
    <Text style={[styles.title, styles.leftTitle]}>Créer votre nouveau compte</Text>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        placeholder="Nom Complet"
        onChangeText={setFullname}
        value={fullname}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        placeholder="Pseudonyme"
        onChangeText={setPseudo}
        value={pseudo}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        placeholder="Adresse mail"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.body}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
    </View>
    <Button
      containerStyle={[styles.facebookContainer, {marginTop: 50}]}
      style={styles.facebookText}
      onPress={() => onRegister()}>
      Créer un compte
    </Button>

    { response.message && <Text>{response.message}</Text> }
    { response.error && <Text>erreur</Text> }
    
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30,
    },
    facebookText: {
      color: AppStyles.color.white,
    },
  });


export default SignupScreen