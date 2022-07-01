import { StyleSheet, Text, TextInput, View } from 'react-native'
import React ,{useState} from 'react'
import {AppStyles} from '../../AppStyles';
import Button from 'react-native-button';

const SignupScreen = () => {

    const [fullname, setFullname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    console.warn('register');
  }
  return (
    <View style={styles.container}>
    <Text style={[styles.title, styles.leftTitle]}>Créer un nouveau compte</Text>
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