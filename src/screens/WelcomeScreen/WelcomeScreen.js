/* eslint-disable prettier/prettier */
import { Text, View,ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react';
import Button from 'react-native-button';
import styles from './styles';
import { image } from '../../../assets/images/index';

const WelcomeScreen = ({ navigation }) => {
  const  [disable, setDisable] = useState(false);
  function onPressHandler(name){
   setDisable(true);
   navigation.push(name);
   setTimeout(()=>{
       setDisable(false);
   },400);
  }
  return (
    <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
 <View style={styles.container}>
      <Text style={styles.title}>El Khatba vous souhaite la bienvenue</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        disabled={disable} 
        onPress={() => onPressHandler("SignIn")}
      >
        Se connecter
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        disabled={disable} 
        onPress={() => onPressHandler("SignUp")}
      >
        Créer un compte
      </Button>
    </View>
    </ImageBackground>
  );
}



export default WelcomeScreen;