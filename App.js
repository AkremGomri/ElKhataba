/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
  import SigninScreen from './src/screens/SigninScreen';
 import SignupScreen from './src/screens/SignupScreen';
 import WelcomeScreen from './src/screens/WelcomeScreen'; 
 export default class App extends Component {
   render() {
     return (
       <SafeAreaView style={styles.root}>
        {/*  <SigninScreen /> */}
        {/* <SignupScreen />  */}
        <WelcomeScreen />
       </SafeAreaView>
     );
   }
 }
 
 const styles = StyleSheet.create({
   root :{
     flex:1,
     backgroundColor:"#F9FBFC"
 
   }
 });
 