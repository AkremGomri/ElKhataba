/* import {
  View, Text, StyleSheet, ImageBackground, Image,
  ImagePickerIOS, AsyncStorage,TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const PhotoScreen = ({ navigation }) => {

  const [disable, setDisable] = useState(false);
  const [state, setState] = useState(
    {
      resourcePath: {},
    }
  );
   const [photo, setPhoto] = useState(
    {
      fileData: '',
      fileUri: '',
    }
  ); 

  async function onPressHandler(name) {
    setDisable(true);
    const data1 = {
      Photo: photo.fileUri,
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

    fetch("http://192.168.1.17:8800/quesphoto/" + JSON.parse(obj1).userId, options)
      .then((res) => {
        console.log("hethi el reponse", res);
        navigation.push(name);
      })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }

  const selectFile = () => {

    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    };

    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });

      }

    });

  };
  // Launch Camera

  const cameraLaunch = () => {

    let options = {

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

    ImagePicker.launchCamera(options, (res) => {

      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }

    });

  }



  const imageGalleryLaunch = () => {

    let options = {

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (res) => {

      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });

      }

    });

  }


  return (
    <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>

      <View style={ styles.container }>
        <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
        <Text style={ [styles.title, styles.leftTitle] }>Votre Photo</Text>
        <View style={ styles.ImageSections }>
          <Image

            source={ {
              uri: 'data:image/jpeg; ,' + state.resourcePath.data,
            } }
            style={ { width: 100, height: 100 } }
          />

          <Image
            source={ { uri: state.resourcePath.uri } }
            style={ { width: 200, height: 200 } }
          />
 </View>
          <Text style={ { alignItems: 'center' } }>
            { state.resourcePath.uri }
          </Text>
          <TouchableOpacity onPress={()=> selectFile()} style={styles.button}  >

              <Text style={styles.buttonText}>Select File</Text>

          </TouchableOpacity>

 
          <TouchableOpacity onPress={ ()=> cameraLaunch() } style={ styles.button }  >

            <Text style={ styles.buttonText }>Launch Camera Directly</Text>

          </TouchableOpacity>



          <TouchableOpacity onPress={ ()=> imageGalleryLaunch() } style={ styles.button }  >

            <Text style={ styles.buttonText }>Launch Image Gallery Directly</Text>

          </TouchableOpacity>
       
         <Button
          containerStyle={ styles.buttonContainer }
          onPress={ () => selectFile() }
         onPress={ () => handleChoosePhoto() } 
        >
          choisir une photo
        </Button> 
         <Button
          containerStyle={ styles.buttonContainer }
          onPress={ () => handleTakePhoto() }
        >
          prendre une photo
        </Button> 

        <Button
          containerStyle={ styles.suivantContainer }
          onPress={ () => onPressHandler("Profile") }>
          <Icon name="forward"
            size={ 70 }
          />
        </Button>
      </View >
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: "center",
    padding: 30,
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

    marginBottom:12    

  },

  buttonText: {

    textAlign: 'center',

    fontSize: 15,

    color: '#fff'

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
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
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
  placeholder: {
    color: 'red',
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
  buttonContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    color: AppStyles.color.grey,
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
});

export default PhotoScreen */

// App.js

 

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from 'react-native-image-picker';

export default class PhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},

    };

  }

 

  selectFile = () => {


  };

 

  // Launch Camera

  cameraLaunch = () => {

    let options = {

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

    ImagePicker.launchCamera(options, (res) => {

      console.log('Response = ', res);

 

      if (res.didCancel) {

        console.log('User cancelled image picker');

      } else if (res.error) {

        console.log('ImagePicker Error: ', res.error);

      } else if (res.customButton) {

        console.log('User tapped custom button: ', res.customButton);

        alert(res.customButton);

      } else {

        const source = { uri: res.uri };

        console.log('response', JSON.stringify(res));

        this.setState({

          filePath: res,

          fileData: res.data,

          fileUri: res.uri

        });

      }

    });

  }

 

  imageGalleryLaunch = () => {

    let options = {

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

 

    ImagePicker.launchImageLibrary(options, (res) => {

      console.log('Response = ', res);

 

      if (res.didCancel) {

        console.log('User cancelled image picker');

      } else if (res.error) {

        console.log('ImagePicker Error: ', res.error);

      } else if (res.customButton) {

        console.log('User tapped custom button: ', res.customButton);

        alert(res.customButton);

      } else {

        const source = { uri: res.uri };

        console.log('response', JSON.stringify(res));

        this.setState({

          filePath: res,

          fileData: res.data,

          fileUri: res.uri

        });

      }

    });

  }  

 

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.container}>

          <Image

            source={{

              uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,

            }}

            style={{ width: 100, height: 100 }}

          />

          <Image

            source={{ uri: this.state.resourcePath.uri }}

            style={{ width: 200, height: 200 }}

          />

          <Text style={{ alignItems: 'center' }}>

            {this.state.resourcePath.uri}

          </Text>

 

          <TouchableOpacity onPress={this.selectFile} style={styles.button}  >

              <Text style={styles.buttonText}>Select File</Text>

          </TouchableOpacity>

 

          <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >

              <Text style={styles.buttonText}>Launch Camera Directly</Text>

          </TouchableOpacity>

 

          <TouchableOpacity onPress={this.imageGalleryLaunch} style={styles.button}  >

              <Text style={styles.buttonText}>Launch Image Gallery Directly</Text>

          </TouchableOpacity>

        </View>

      </View>

    );

  }

}

 

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 30,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#fff'

  },

  button: {

    width: 250,

    height: 60,

    backgroundColor: '#3740ff',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 4,

    marginBottom:12    

  },

  buttonText: {

    textAlign: 'center',

    fontSize: 15,

    color: '#fff'

  }

});