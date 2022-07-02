import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from 'radio-buttons-react-native';
import { AppStyles } from '../../AppStyles';
import SelectDropdown from 'react-native-select-dropdown'
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const GenderScreen = ({ navigation }) => {
    const  [disable, setDisable] = useState(false);
  function onPressHandler(name){
   setDisable(true);
   navigation.push(name);
   setTimeout(()=>{
       setDisable(false);
   },400);
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
        <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
            <View style={ styles.container }>

                <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
                <Text style={ [styles.title, styles.leftTitle] }>Vous êtes</Text>
                <RadioButtonRN 
                    data={ data }
                    selectedBtn={ (e) => console.log(e) }
                    icon={
                        <Icon
                            name="check-circle"
                            size={ 25 }
                            color="#2c9dd1"
                        />
                    }
                />
                <Text style={ [styles.title, styles.leftTitle] }>Vous cherchez</Text>
                <RadioButtonRN 
                    data={ data }
                    selectedBtn={ (e) => console.log(e) }
                    icon={
                        <Icon
                            name="check-circle"
                            size={ 25 }
                            color="#2c9dd1"
                        />
                    }
                />
                <Button
                    containerStyle={ styles.suivantContainer }
                    style={ styles.suivantText }
                    onPress={() => onPressHandler("Location")}
                    >
                    <Icon name="forward"
                        size={ 70 }
                        color="#" />
                </Button>
            </View >
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
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
        placement: "top",

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 40,
        marginBottom: 20,
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
        height: 42,
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
    suivantText: {
        color: AppStyles.color.white,
    },
});

export default GenderScreen