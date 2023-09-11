/* eslint-disable prettier/prettier */
import {
    View, Text,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    AsyncStorage,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from 'radio-buttons-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { getToken, getData } from '../../../services/auth/asyncStorage';
import env from '../../../../env';
import styles from '../styles';
import { image } from '../../../../assets/images';
const GenderScreen = ({ navigation }) => {
    const [disable, setDisable] = useState(false);
    const [gender, setGender] = useState('');
    const [searchGender, setSearchGender] = useState('');
    async function onPressHandler(name) {
        setDisable(true);
        const data1 = {
            gender: gender,
            searchGender: searchGender,
        };

        const token = await getToken();
        const options = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data1),
        }
        const userId = (await getData("userId")).value;
        fetch(env.BACKEND_SERVER_URL + "/user/ques/" + userId, options)
            .then((res) => {
                if (gender && searchGender) {
                    navigation.push(name);
                }
                else {
                    Alert.alert("Il faut saisir votre valeur");
                }

            })
            .catch((err) => Alert.alert("problem connecting to the server: " + err))
        setTimeout(() => {
            setDisable(false);
        }, 400);
    }
    const data = [
        {
            label: 'femme'
        },
        {
            label: 'homme'
        }
    ];
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <Text style={styles.topTitle} >Inscrivez-vous gratuitement</Text>
                    <Text style={[styles.title, styles.leftTitle]}>Vous êtes</Text>
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
                    <Text style={[styles.title, styles.leftTitle]}>Vous cherchez</Text>
                    <RadioButtonRN
                        value={searchGender}
                        data={data}
                        selectedBtn={(e) => {
                            console.log(e.label);
                            setSearchGender(e.label);
                        }}
                        icon={
                            <Icon
                                name="check-circle"
                                size={25}
                                color="#2c9dd1"
                            />
                        }
                    />
                    <Button
                        containerStyle={styles.suivantContainer}
                        onPress={() => onPressHandler("Location")}
                    >
                        <Icon name="forward"
                            size={70}
                            color="#" />
                    </Button>

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
};

export default GenderScreen;