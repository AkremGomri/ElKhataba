import React from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, Button, View } from "react-native";

export default function AuthScreen({ navigation }) {
  return (
    <View>
        <Text> SigninScreen </Text>
        <Button 
            title='Sign In' 
            onPress={() => navigation.push("SignIn")}
        />

        <Button 
            title='Register' 
            onPress={() => navigation.push("SignUp")}
        />
    </View>
  )
}
