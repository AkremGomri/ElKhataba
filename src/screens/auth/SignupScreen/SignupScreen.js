/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React ,{useState} from 'react'
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import Button from 'react-native-button';
import env from '../../../../env';
import styles from '../styles';


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
  
    fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/signup", options)
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
export default SignupScreen