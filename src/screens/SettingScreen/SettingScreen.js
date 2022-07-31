/* eslint-disable prettier/prettier */
import { Text, StyleSheet, ImageBackground,TextInput,
  View,SafeAreaView,Alert,AsyncStorage} from 'react-native'
import React ,{useState} from 'react'
import Icon from 'react-native-fontawesome';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import env from '../../../env'

const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const SettingScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onEdit =async () => {
    const getToken = async () => {
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
    old_password: oldPassword,
    new_password:newPassword ,
    confirm_password:confirmPassword,
};
const obj1 = await getToken();
console.log(obj1);
const options = {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(obj1)['token'],
  },
  body: JSON.stringify(data),
}
fetch(env.BACKEND_SERVER_URL + "/password-reset/"+ JSON.parse(obj1).userId, options)
  .then((res) => navigation.push("Profile"))
  .catch((err) => err)
}

  return (
    <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
    <SafeAreaView style={ styles.container }>
        
            <Text style={ [styles.title, styles.Title] }>Changer le mot de passe</Text>
            <TextInput
                style={[ styles.body, styles.default ]}
               type='password'
               secureTextEntry={true}
               placeholder='saisir votre ancien mot de passe'
                onChangeText={ setOldPassword }
                value={ oldPassword }
                placeholderTextColor={ AppStyles.color.grey }
                underlineColorAndroid="transparent"
            />
            <TextInput
               style={[ styles.body, styles.default ]}
               type='password'
               secureTextEntry={true}
               placeholder='saisir votre nouveau mot de passe'
                onChangeText={ setNewPassword }
                value={ newPassword }
                placeholderTextColor={ AppStyles.color.grey }
                underlineColorAndroid="transparent"
            />
            <TextInput
                style={[ styles.body, styles.default ]}
               type='password'
               secureTextEntry={true} 
               placeholder='réentrez votre nouveau mot de passe'
                onChangeText={ setConfirmPassword }
                value={ confirmPassword }
                placeholderTextColor={ AppStyles.color.grey }
                underlineColorAndroid="transparent"
            />
            <View style={ styles.mainButtoncontainer }>
                    <Button
                        containerStyle={ styles.buttonContainer }
                        style={ styles.loginText }
                        onPress={ () => navigation.push("Profile") }>
                        Annuler
                    </Button>
                    <Button
                        containerStyle={ styles.buttonContainer }
                        style={ styles.loginText }
                        onPress={ () => onEdit() }>
                         Enregistrer
                    </Button>
                    </View>
            </SafeAreaView>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
  mainButtoncontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:45,
},
  container: {
      flex: 1,
      alignItems: "center",

  },
  scrollView: {
      marginHorizontal: 20,
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
      textAlign: "center",
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 30,
  },
  leftTitle: {
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 20,
  },
  Title: {
      alignSelf: 'stretch',
      textAlign: 'center',
  },
  loginText: {
      color: AppStyles.color.white,
  },
  buttonContainer: {
    width: 120,
    flex: 1,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginLeft:20,
    marginTop: 10,
    marginBottom: 20,
},
  placeholder: {
      color: 'red',
  },
  default: {
    marginBottom:40,
  },

});
export default SettingScreen;