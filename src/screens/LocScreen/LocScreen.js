import {View, Text, StyleSheet, ImageBackground ,TextInput} from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppStyles } from '../../AppStyles';
const image = { uri: "https://img.freepik.com/vecteurs-libre/abstrait-blanc-dans-style-papier-3d_23-2148390818.jpg?w=2000" };
const LocScreen = ({ navigation }) => {
    const  [disable, setDisable] = useState(false);
  function onPressHandler(name){
   setDisable(true);
   navigation.push(name);
   setTimeout(()=>{
       setDisable(false);
   },400);
  }
    const [ville, setVille] = useState('');
    return (
        <ImageBackground source={ image } resizeMode="cover" style={ styles.image }>
            <View style={ styles.container }>

                <Text style={ styles.topTitle } >Inscrivez-vous gratuitement</Text>
                <Text style={ [styles.title, styles.leftTitle] }>Votre Ville</Text>
                <TextInput
        style={styles.body}
        placeholder="entrez ici votre Ville"
        onChangeText={setVille}
        value={ville}
        placeholderTextColor={AppStyles.color.grey}
        underlineColorAndroid="transparent"
      />
        <Button
                    containerStyle={ styles.suivantContainer }
                    style={ styles.suivantText }
                    onPress={() => onPressHandler("Photo")}
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
        fontSize:20,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main,
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

export default LocScreen