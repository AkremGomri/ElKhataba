import { View, Text, 
     ImageBackground, 
     Alert,Image,AsyncStorage  } from 'react-native'
import React, { useState,useEffect } from 'react'
import * as ImagePicker from "react-native-image-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageComponent from '../../../components/image/ImageComponent';
import { getToken ,getData} from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles'

const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const UserProfileScreen =  ({ navigation }) => {
    const ICON_FONT = "tinderclone";
    const [disable, setDisable] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        getUser();
      }, []);
   
      async function getUser() {
      const options = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      const userId= (await getData("userId")).value;
      fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+'/'+userId, options)
          .then(response =>response.json())
             .then(data =>{
                setUser(data);
                console.log(user);
                 
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
       
      const token = await getToken();
        const options = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        }
        fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+"/logout", options)
            .then((res) =>{
              console.log(res.status);
              console.log('successfully loged out');
              navigation.push('SignIn');
            })
             .catch((err)=>console.log('mamchech logout' ,err))
      }
      const renderFile=()=> {
        if (user.Photo!="") {
          return <ImageComponent
            src={user.Photo} 
          />
        } else {
            return  <Image
              style={styles.detailPhoto}
              source={require('../../../../assets/images/woman.png')}
              
            />
         
        }
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
                {renderFile()}
                {/* <Image style={ styles.imageProf }
                    source={ { uri: `${user.Photo}`}}
                    style={ { width: 300, height: 300, borderRadius: 100 } }
                ></Image> */}
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


export default UserProfileScreen