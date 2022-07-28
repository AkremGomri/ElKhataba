import { View, Text, StyleSheet,
     ImageBackground, 
     Alert,Image,AsyncStorage  } from 'react-native'
import React, { useState,useEffect } from 'react'
import * as ImagePicker from "react-native-image-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const UserProfileScreen =  ({ navigation }) => {
    const ICON_FONT = "tinderclone";
    const [disable, setDisable] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        getUsers();
      }, []);
    const getToken=async () =>{
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
      async function getUsers() {
        const obj1=await getToken();
      const options = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      // console.log(JSON.parse(obj1).userId);
      fetch("http://192.168.1.17:8800/"+JSON.parse(obj1).userId, options)
          .then(response =>response.json())
             .then(data =>{
                //console.log("this is the user pseudo",data.pseudo); 
                setUser(data);
                //console.log(user);
                 
    })
          .catch((err) => Alert.alert("problem connecting to the server: " + err))

      }
      
    const handleChoosePhoto = () => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            console.log("response", response);
        })
    }
    
    function onPressHandler(name) {
        setDisable(true);
        navigation.push(name,{user});
        setTimeout(() => {
            setDisable(false);
        }, 400);
    }
    const doUserLogOut = async function () {
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
      const obj1 = await getToken();
        const options = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(obj1).token,
          },
        }
        fetch("http://192.168.1.17:8800/logout", options)
            .then((res) =>{
              console.log(res.status);
              console.log('successfully loged out');
              navigation.push('SignIn');
            })
             .catch((err)=>console.log('mamchech logout' ,err))
      }
    return (
        <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
            <View style={ styles.container }>
            <Icon name='power-off'
                style={{fontSize:30, alignSelf: 'flex-end',
                marginTop:0}}
                onPress={() => {
                  doUserLogOut();
                }}
                        /> 
                <Text style={ [styles.title, styles.Title] }>{user.pseudo}</Text>
                <Image style={ styles.imageProf }
                    source={ { uri: `${user.Photo}`}}
                    style={ { width: 300, height: 300, borderRadius: 100 } }
                ></Image>
                <View style={ styles.container2 } >
                    <View >
                        <Text style={ {
                            paddingLeft: 10
                        } }>modifier</Text>
                        <Icon name='edit'
                            style={ {
                                fontFamily: ICON_FONT,
                                fontSize: 60,
                                paddingLeft: 10,
                                paddingRight: 40,
                                color: "#ff6768"
                            } }
                            onPress={ () => onPressHandler("Modifier Profil") }
                        />
                    </View>
                    <View>
                        <Text style={ {
                            paddingLeft: 20
                        } }>paramètres</Text>
                        <Icon name='gear'
                            style={ {
                                fontFamily: ICON_FONT,
                                fontSize: 60,
                                paddingLeft: 40,
                                paddingRight: 40,
                                color: "#ff6768",
                                transform: [{ rotate: "90deg" }]
                            } }
                            onPress={ () => onPressHandler("Paramètres") }
                        />
                    </View>
                    <View>
                        <Text style={ {
                            paddingLeft: 20
                        } }>ajouter media</Text>
                        <Icon name='camera'
                            style={ {
                                fontFamily: ICON_FONT,
                                paddingLeft: 40,
                                paddingRight:10,
                                color: "#ff6768",
                                fontSize: 60
                            } }
                            onPress={ () => handleChoosePhoto()}
                        />

                    </View>

                </View>
            </View >
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    container2: {
        paddingTop: 75,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
         alignItems: "center"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    imageProf: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginBottom: 30,
    },
    Title: {
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    loginText: {
        color: AppStyles.color.white,
    },
    placeholder: {
        color: 'red',
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    buttonContainer: {
        width: 100,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 50,
        marginLeft: 200,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 100,
        marginRight: -50,
        color: 'grey',
    },
});

export default UserProfileScreen