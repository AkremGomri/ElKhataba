/* eslint-disable prettier/prettier */
import {
  View, Text, StyleSheet, ImageBackground, Image,
  ImagePickerIOS, AsyncStorage,TouchableOpacity,
  Alert
} from 'react-native'
import React, { useState,useRef } from 'react';
import ImagePicker from '../../components/common/ImagePicker2';
//import * as ImagePicker from 'react-native-image-picker';
//import { launchImageLibrary } from 'react-native-image-picker';
import env from '../../../env';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
import ImageComponent from '../EditScreen/ImageComponent';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const PhotoScreen = ({ navigation }) => {
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);
  const [disable, setDisable] = useState(false);
  const [Photo, setPhoto] = useState('');
  
  const onFileSelected = (image) => {
    console.log("c'est l'image choisie" ,image);
    closeSheet();
    setLocalFile(image);
    setPhoto(image["path"]);
    console.log(Photo);
    setUploadSucceeded(true);    
  };
const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  async function onPressHandler(name) {
    setDisable(true);
    const data1 = {
      Photo: Photo
    };
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
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(obj1).token,
      },
      body: JSON.stringify(data1),
    }

    fetch(env.BACKEND_SERVER_URL + "/ques/" + JSON.parse(obj1).userId, options)
      .then((res) => {
        console.log("hethi el reponse", res);
        navigation.push(name);
      })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }

  

  const renderFile=()=> {
    if (Photo!="") {
      return <ImageComponent
        src={Photo} 
      />
    } else {
        return  <Image
          style={styles.detailPhoto}
          source={require('../../../assets/images/woman.png')}
        />
     
    }
  }
  return (
    <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>

      <View style={ styles.container }>
        <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
        <Text style={ [styles.title, styles.leftTitle] }>Votre Photo</Text>
       
        {renderFile()}
          <TouchableOpacity onPress={()=> openSheet()} style={styles.button}  >

              <Text style={styles.buttonText}>Select File</Text>

          </TouchableOpacity>
        <Button
          containerStyle={ styles.suivantContainer }
          onPress={ () => onPressHandler("Profile") }>
          <Icon name="forward"
            size={ 70 }
          />
        </Button>
        <ImagePicker onFileSelected={onFileSelected}  ref={sheetRef} />
      </View>
      
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  button: {

    width: 250,

    height: 60,

    backgroundColor: '#3740ff',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 4,

    marginBottom:12,
    
    marginTop: 10,

  },
  detailPhoto :{
    justifyContent: "center",
    height: 260, width: '90%',
   resizeMode: 'cover',borderRadius: 100
},
  buttonText: {

    textAlign: 'center',

    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'

  },
  topTitle: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: 'bold',
    color: 'black',
    placement: "top"

  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 10,
    marginBottom: 50,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  
  body: {
    fontSize: 20,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  suivantContainer: {
    width: 100,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    marginLeft: 200,
  },
});

export default PhotoScreen

