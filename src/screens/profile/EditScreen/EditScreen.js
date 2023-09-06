/* eslint-disable prettier/prettier */
import {
    View, Text,
    ImageBackground, Image,
    TextInput, SafeAreaView,
    ScrollView,
    Alert, AsyncStorage, TouchableOpacity
} from 'react-native';
//import storage from '@react-native-firebase/storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioButtonRN from 'radio-buttons-react-native';
import ImageComponent from '../../../components/image/ImageComponent';
import Button from 'react-native-button';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
//import { Icon } from 'react-native-elements'
import { AppStyles } from '../../../styles/generalStyles/AppStyles';
import ImagePicker from '../../../components/common/ImagePicker';
import { getToken, getData } from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles'
import { image, DefaultMan, DefaultWoman } from '../../../../assets/images';

const EditScreen = ({ navigation, route, }) => {
    const user = route.params.user;
    const sheetRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [uploadSucceeded, setUploadSucceeded] = useState(false);
    const horoscopes = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poisson"]
    const [bio, setBio] = useState(user.bio);
    const [date, setDate] = useState(user.date_of_birth);
    const [horoscope, setHoroscope] = useState(user.horoscope);
    const [city, setCity] = useState(user.city);
    const [gender, setGender] = useState(user.gender);
    const [Photo, setPhoto] = useState(user.Photo);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userId, setUserId] = useState(0);


    useEffect(() => {
        getData("userId").then(x => {
            setUserId(x.value);
        });
    }, []);
    const data = [
        {
            label: 'femme'
        },
        {
            label: 'homme'
        }
    ];
    const onFileSelected = async (image) => {
        setSelectedImage(image);
        closeSheet();
        setLocalFile(image);
        setPhoto(image["path"]);
    }
    const uploadFile = async () => {
        if (selectedImage == null) return;
        const uploadToServer = async () => {
            try {
                const nameAndType = selectedImage.path.split('/').pop()
                const type = nameAndType.split('.').pop();
                const name = nameAndType.split('.')[0];
                const fileZip = {
                    file: selectedImage.data,
                    fileName: name,
                    fileType: type
                }
                console.log(`${env.BACKEND_SERVER_URL}/user/update-profile/${userId}`)
                const options = {
                    method: "PUT",
                    // mode: "no-cors", // no-cors, *cors, same-origin
                    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    // credentials: "omit", // include, *same-origin, omit
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '
                    },
                    body: JSON.stringify(fileZip),
                }

                // replace 64837888d356e89a7c03b8fc with ${userID}
                return await fetch(`${env.BACKEND_SERVER_URL}/user/update-profile/${userId}`, options)
                    .then((res) => {
                        return res.json();
                    })
                    .then(x => { console.log('upload response', x); return x; })

            }
            catch (err) {
                console.log("error-====>", err)
            }

        }
        let imagePath = await uploadToServer();
        closeSheet();
        setLocalFile(selectedImage);
        setPhoto(selectedImage["path"]);
        setUploadSucceeded(true);
        return imagePath;

    };
    const closeSheet = () => {
        if (sheetRef?.current) {
            sheetRef.current.close();
        }
    };
    const openSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.open();
        }
    };

    const onEdit = async () => {
        try {
            console.log('uploading file')
            let imagePath = await uploadFile();
            console.log(imagePath);
            const data = {
                bio: bio,
                date_of_birth: date,
                horoscope: horoscope,
                city: city,
                gender: gender,
                Photo: imagePath?.data?.Photo ?? Photo,
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
            const userId = (await getData("userId")).value;

            console.log('updating profile', env.BACKEND_SERVER_URL + '/user/update-bio/' + userId)
            fetch(env.BACKEND_SERVER_URL + '/user/update-bio/' + userId, options)
                .then((res) => {
                    console.log(res.status);
                    navigation.push("Profile")
                })
                .catch((err) => { console.log(error) })
                .finally(() => {
                    console.log('finally');
                });
        }
        catch (err) {
            console.log(err);
        }
    }
    // Triggers on hitting delete
    const onDeleteImage = async () => {
        const token = await getToken();
        const userId = (await getData("userId")).value;
        const options = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ Photo: "" }),
        }

        fetch(env.BACKEND_SERVER_URL + '/ques/' + userId, options)
            .then((res) => navigation.push("Profile"))
            .catch((err) => error)

    }
    const renderFile = () => {
        if (Photo != "") {
            return <ImageComponent
                src={Photo || localFile?.path}
            />
        } else {
            return ((user.gender === "femme") ? <Image source={DefaultWoman} style={styles.detailPhoto} /> :
                <Image source={DefaultMan} style={styles.detailPhoto} />
            )

        }
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };

    return (

        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={[styles.title, styles.Title]}>{user.pseudo}</Text>
                    {renderFile()}
                    <TouchableOpacity
                        onPress={() => {
                            openSheet();
                        }}>
                        <Text style={[styles.Proftitle]}>
                            {' '}
                            {'changer la photo de Profil'}{' '}
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, styles.leftTitle]}>A propos</Text>
                    <TextInput
                        style={styles.body}
                        placeholder={bio}
                        onChangeText={setBio}
                        value={bio}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={[styles.title, styles.leftTitle]}>date de naissance</Text>
                    {/*  <TextInput
                        
                        placeholder={ date }
                        onChangeText={ setDate }
                        value={ date }
                        placeholderTextColor={ AppStyles.color.grey }
                        underlineColorAndroid="transparent"
                    /> */}

                    <Button containerStyle={styles.signupContainer}
                        style={styles.signupText} onPress={showDatePicker} >
                        choisir une date
                    </Button>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={[styles.title, styles.leftTitle]}>Horoscope</Text>
                    <SelectDropdown
                        value={horoscope}
                        data={horoscopes}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);;
                            setHoroscope(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Text style={[styles.title, styles.leftTitle]}>ville</Text>
                    <TextInput
                        style={styles.body}
                        placeholder={city}
                        onChangeText={setCity}
                        value={city}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={[styles.title, styles.leftTitle]}>Genre</Text>

                    <RadioButtonRN
                        data={data}
                        value={gender}
                        selectedBtn={(e) => {
                            console.log(e.label);
                            setGender(e.label);
                        }}
                        icon={
                            <Icon
                                name="check-circle"
                                size={25}
                                color="#2c9dd1"
                            />
                        }
                    />
                    <View style={styles.mainButtoncontainer}>
                        <Button
                            containerStyle={styles.buttonContainer}
                            style={styles.loginText}
                            onPress={() => navigation.push("Profile")}>
                            Annuler
                        </Button>
                        <Button
                            containerStyle={styles.buttonContainer}
                            style={styles.loginText}
                            onPress={() => onEdit()}>
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