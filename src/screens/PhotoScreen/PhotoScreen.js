import { View, Text, StyleSheet, ImageBackground, TextInput, ImagePickerIOS,AsyncStorage } from 'react-native'
import React, { useState } from 'react'
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const PhotoScreen = ({ navigation }) => {
    const [disable, setDisable] = useState(false);
    const [photo, setPhoto] = useState('');
    async function onPressHandler(name) {
        setDisable(true);
    const data1 = { 
        Photo:photo,
      };
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
      const obj1=await getToken();
    const options = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(obj1).token,
        },
        body: JSON.stringify(data1),
      }
     
      fetch("http://192.168.1.11:8800/ques/"+JSON.parse(obj1).userId, options)
      .then((res) => {
          navigation.push(name);
        })
      .catch((err) => Alert.alert("problem connecting to the server: " + err))
    setTimeout(() => {
        setDisable(false);
    }, 400);
    }
    const handleChoosePhoto = () => {
            let options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.launchImageLibrary(options, (response) => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                  filePath: response,
                  fileData: response.data,
                  fileUri: response.uri
                });
              }
            });
    }
    const handleTakePhoto =()=>{
            let options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.launchCamera(options, (response) => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                  filePath: response,
                  fileData: response.data,
                  fileUri: response.uri
                });
              }
            });

    }

    /* const renderFileData=()=> {
        if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images}
          />
        } else {
          return <Image source={require('./assets/dummy.png')}
            style={styles.images}
          />
        }
      }
    
     const renderFileUri=()=> {
        if (this.state.fileUri) {
          return <Image
            source={{ uri: this.state.fileUri }}
            style={styles.images}
          />
        } else {
          return <Image
            source={require('./assets/galeryImages.jpg')}
            style={styles.images}
          />
        }
      } */
    return (
        <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
            <View style={ styles.container }>
                <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
                <Text style={ [styles.title, styles.leftTitle] }>Votre Photo</Text>
                <Button
                    containerStyle={ styles.buttonContainer }
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
                    onPress={() =>onPressHandler("Home")}>
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
        alignItems: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center"
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 100,
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

export default PhotoScreen