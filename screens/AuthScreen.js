import React, { useState } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, Button, View } from "react-native";

export default function AuthScreen({ navigation }) {
   const  [disable, setDisable] = useState(false);
   function onPressHandler(name){
    setDisable(true);
    navigation.push(name);
    setTimeout(()=>{
        setDisable(false);
    },400);
   }

    return (
    <View>
        <Text> SigninScreen </Text>
        <Button 
            title='Sign In' 
            disabled={disable}
            onPress={() => onPressHandler("SignIn")}
        />

        <Button 
            title='Register'
            disabled={disable} 
            onPress={() => onPressHandler("SignUp")}
        />
    </View>
  )
}
