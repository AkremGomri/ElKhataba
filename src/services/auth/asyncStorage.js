/* eslint-disable prettier/prettier */
import {AsyncStorage} from "react-native";

export const storeData = async (key, value) => {		
    try {
      await AsyncStorage.setItem(key, value);
      const test = await AsyncStorage.getItem(key);     
      return {
          success: true
      }
    } catch (error) {
      return {
          success: false,
          error
      }
    }
  }
  // get item
  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);//'649303931c444f0d4e9d6c68'; // uzair token id 
      return {
          success: true,
          value
      }
    } catch(error) {
      return {
          success: false,
          error
      }
    }
  }

export const storeToken = async (user) => {
    try {
       await AsyncStorage.setItem("token", JSON.stringify(user));
    } catch (error) {
      console.warn("Something went wrong", error);
    }
  }

export const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("token");
      let data = JSON.parse(userData);
      return data;
    } catch (error) {
      console.warn("Something went wrong", error);
    }
  }
  
 /*  const getToken=async () =>{
    try {
      let userData = await AsyncStorage.getItem("userData");
      let obj = JSON.parse(userData);
      console.log("hetha el obj");
      console.log(obj);
      return obj;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  } */
  
  export default {
        getToken,
        storeToken,
        getData,
        storeData
  }
  