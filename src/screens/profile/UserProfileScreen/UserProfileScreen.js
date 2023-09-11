import {
  View, Text,
  ImageBackground,
  Alert, Image, AsyncStorage
} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from "react-native-image-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageComponent from '../../../components/image/ImageComponent';
import { getToken, getData } from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles'
import { image, DefaultMan, DefaultWoman } from '../../../../assets/images';
import { AppStyles } from '../../../styles/generalStyles/AppStyles';

const UserProfileScreen = ({ navigation }) => {

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
    const userId = (await getData("userId")).value;
    console.log('get user');
    fetch(env.BACKEND_SERVER_URL + '/user/' + userId, options)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        console.log('user', user);

      })
      .catch((err) => {
        console.log(err);
        Alert.alert("problem connecting to the server: " + err)
      })
      .finally(() => {
        console.log('finally');
      })

  }

  const handleChoosePhoto = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response);
    })
  }

  function onPressHandler(name) {
    setDisable(true);
    navigation.push(name, { user });
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
    fetch(env.BACKEND_SERVER_URL + "/user/logout", options)
      .then((res) => {
        console.log(res.status);
        console.log('successfully loged out');
        navigation.push('SignIn');
      })
      .catch((err) => console.log('mamchech logout', err))
  }
  const renderFile = () => {
    if (user.Photo != "") {
      console.log('user.Photo', user.Photo);
      return <ImageComponent
        src={user.Photo}
      />
    } else {
      return ((user.gender === "femme") ? <Image source={DefaultWoman} style={styles.detailPhoto} /> :
        <Image source={DefaultMan} style={styles.detailPhoto} />
      )

    }
  }
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Icon name='power-off'
          style={{
            fontSize: 20, alignSelf: 'flex-end',
            marginTop: 0
          }}
          onPress={() => {
            doUserLogOut();
          }}
        />
        <Text style={[styles.title, styles.Title]}>{user.pseudo}</Text>
        {renderFile()}
        {/* <Image style={ styles.imageProf }
                    source={ { uri: `${user.Photo}`}}
                    style={ { width: 300, height: 300, borderRadius: 100 } }
                ></Image> */}
        <View style={styles.container2} >
          <View >
            <Text style={styles.iconText}>modifier</Text>
            <Icon name='edit'
              style={styles.iconModif}
              onPress={() => onPressHandler("Modifier Profil")}
            />
          </View>
          <View>
            <Text style={styles.iconText}>paramètres</Text>
            <Icon name='gear'
              style={styles.iconParam}
              onPress={() => onPressHandler("Paramètres")}
            />
          </View>
          <View>
            <Text style={styles.iconText}>ajouter media</Text>
            <Icon name='camera'
              style={styles.iconMedia}
              onPress={() => handleChoosePhoto()}
            />

          </View>

        </View>
      </View >
    </ImageBackground>
  )
};


export default UserProfileScreen