/* eslint-disable prettier/prettier */
import {
    View, Text, 
    ImageBackground, Image,
    TextInput, SafeAreaView,
    ScrollView, 
    Alert, AsyncStorage,TouchableOpacity
} from 'react-native';
//import storage from '@react-native-firebase/storage';
import RadioButtonRN from 'radio-buttons-react-native';
import ImageComponent from '../../../components/image/ImageComponent';
import Button from 'react-native-button';
import React, { useState,useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
//import { Icon } from 'react-native-elements'
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import ImagePicker from '../../../components/common/ImagePicker';
import { getToken ,getData} from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles'

const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const EditScreen = ({ navigation, route,}) => {
    const user = route.params.user;
    const sheetRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const [uploadSucceeded, setUploadSucceeded] = useState(false);
    const horoscopes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poisson"]
    const [bio, setBio] = useState(user.bio);
    const [date, setDate] = useState(user.date_of_birth);
    const [horoscope, setHoroscope] = useState(user.horoscope);
    const [city, setCity] = useState(user.city);
    const [gender, setGender] = useState(user.gender);
    const [Photo, setPhoto] = useState(user.Photo);
   
    const data = [
        {
            label: 'femme'
        },
        {
            label: 'homme'
        }
    ];
   
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
   
    const onEdit = async () => {
       
        const data = {
            bio:bio,
            date_of_birth: date,
            horoscope: horoscope,
            city: city,
            gender: gender,
            Photo:Photo,
        };
        const token = await getToken();
        const options = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        }
        const userId= (await getData("userId")).value;
        fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+'/ques/' +userId, options)
            .then((res) => navigation.push("Profile"))
            .catch((err) => error)
    }
    // Triggers on hitting delete
const  onDeleteImage=async()=> {
    const token = await getToken();
    const userId= (await getData("userId")).value;
    const options = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token,
        },
        body: JSON.stringify({Photo:""}),
    }

    fetch(env.BACKEND_SERVER_URL +":"+ env.PORT+'/ques/' +userId, options)
        .then((res) => navigation.push("Profile"))
        .catch((err) => error)

  }
  const renderFile=()=> {
    if (Photo!="") {
      return <ImageComponent
        src={Photo || localFile?.path} 
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
            <SafeAreaView style={ styles.container }>
                <ScrollView style={ styles.scrollView }>
                    <Text style={ [styles.title, styles.Title] }>{ user.pseudo }</Text>
                    {renderFile()}
                    <TouchableOpacity
              onPress={() => {
                openSheet();
              }}>
              <Text style={ [styles.Proftitle] }>
                {' '}
                {'changer la photo de Profil'}{' '}
              </Text>
            </TouchableOpacity>
                    <Text style={ [styles.title, styles.leftTitle] }>A propos</Text>
                    <TextInput
                        style={ styles.body }
                        placeholder={bio}
                        onChangeText={ setBio }
                        value={ bio }
                        placeholderTextColor={ AppStyles.color.grey }
                        underlineColorAndroid="transparent"
                    />
                    <Text style={ [styles.title, styles.leftTitle] }>date de naissance</Text>
                    <TextInput
                        style={ styles.body }
                        placeholder={ date }
                        onChangeText={ setDate }
                        value={ date }
                        placeholderTextColor={ AppStyles.color.grey }
                        underlineColorAndroid="transparent"
                    />
                    <Text style={ [styles.title, styles.leftTitle] }>Horoscope</Text>
                     <SelectDropdown
                value={horoscope}
                    data={ horoscopes }
                    onSelect={ (selectedItem, index) => {
                        console.log(selectedItem, index);;
                        setHoroscope(selectedItem);
                    } }
                    buttonTextAfterSelection={ (selectedItem, index) => {
                           return selectedItem
                    } }
                    rowTextForSelection={ (item, index) => {
                        return item
                    } }
                />
                    <Text style={ [styles.title, styles.leftTitle] }>ville</Text>
                    <TextInput
                        style={ styles.body }
                        placeholder={ city }
                        onChangeText={ setCity }
                        value={ city }
                        placeholderTextColor={ AppStyles.color.grey }
                        underlineColorAndroid="transparent"
                    />
                    <Text style={ [styles.title, styles.leftTitle] }>Genre</Text>
                    
                    <RadioButtonRN 
                    data={ data }
                    value={gender}
                    initial={1}
                    selectedBtn={ (e) => {
                    console.log(e.label);
                    setGender(e.label);
                    } }
                    icon={
                        <Icon
                            name="check-circle"
                            size={ 25 }
                            color="#2c9dd1"
                        />
                    }
                />
                    <View style={ styles.mainButtoncontainer }>
                    <Button
                        containerStyle={ styles.buttonContainer }
                        style={ styles.loginText }
                        onPress={ () => navigation.push("Profile") }>
                        Annuler
                    </Button>
                    <Button
                        containerStyle={ styles.buttonContainer }
                        style={ styles.loginText }
                        onPress={ () => onEdit() }>
                         Enregistrer
                    </Button>
                    </View>
                    <ImagePicker onFileSelected={onFileSelected} onDeleteImage={onDeleteImage} ref={sheetRef} />
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
};

export default EditScreen