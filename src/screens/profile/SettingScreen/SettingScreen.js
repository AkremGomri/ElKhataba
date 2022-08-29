/* eslint-disable prettier/prettier */
import { Text, ImageBackground,TextInput,
  View,SafeAreaView,Alert,AsyncStorage} from 'react-native'
import React ,{useState} from 'react'
import Icon from 'react-native-fontawesome';
import Button from 'react-native-button';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import { getToken ,getData} from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles'
import { image } from '../../../../assets/images';
const SettingScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onEdit =async () => {
   
  const data = { 
    old_password: oldPassword,
    new_password:newPassword ,
    confirm_password:confirmPassword,
};
const token = await getToken();
const userId= (await getData("userId")).value;
const options = {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +token,
  },
  body: JSON.stringify(data),
}
fetch(env.BACKEND_SERVER_URL + "/password-reset/"+ userId, options)
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


export default SettingScreen;