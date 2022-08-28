
import { StyleSheet,StatusBar } from 'react-native'
import { AppStyles } from '../../styles/generalStyles/AppStyles';

const ICON_FONT = "tinderclone";
const styles = StyleSheet.create({
    signupContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 8,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop:0,
      },
      signupText: {
        color: AppStyles.color.tint,
        fontFamily: AppStyles.fontFamily.fontFam,
        textAlign:'center'
      },
    mainButtoncontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:45,
    },
    iconText:{
            paddingLeft: 20,
            color:'white',
            fontFamily: AppStyles.fontFamily.fontFam,
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,

    },
    container2: {
        paddingTop: 75,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
         alignItems: "center"
    },
    scrollView: {
        marginHorizontal: 20,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    
    imageProf: {
        flex: 1,
        justifyContent: "center",
    },
    
    topTitle: {
        marginTop: 10,
        marginBottom: 50,
        fontSize: 30,
        fontStyle: "italic",
        fontWeight: 'bold',
        color: 'black',
        placement: "top",
        textAlign: "center",

    },
    detailPhoto :{
        justifyContent: "center",
        height: 300, width: '90%',
       resizeMode: 'cover',borderRadius: 100
    },
    Proftitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#AACDFA',
        marginTop: 10,
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: AppStyles.fontFamily.fontFam,
        color:'white',
        // AppStyles.color.tint,
        marginTop: 10,
        marginBottom: 30,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },
    Title: {
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    loginText: {
        color: AppStyles.color.white,
        fontFamily: AppStyles.fontFamily.fontFam,
    },
    buttonContainer: {
        width: 120,
        flex: 1,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginLeft:20,
        marginTop: 10,
        marginBottom: 20,
    },
    placeholder: {
        color: 'red',
    },
    body: {
        textAlign: 'left',
        height: 100,
        paddingLeft: 0,
        paddingRight: 100,
        color: AppStyles.color.text,
    },
    default: {
        marginBottom:40,
      },
      iconModif :{
        fontFamily: ICON_FONT,
        fontSize: 60,
        paddingLeft: 10,
        paddingRight: 40,
        color: AppStyles.color.icon
    },
    iconParam:
    {
        fontFamily: ICON_FONT,
        fontSize: 60,
        paddingLeft: 40,
        paddingRight: 40,
        color: AppStyles.color.icon,
        transform: [{ rotate: "90deg" }]
    },
    iconMedia: {
        fontFamily: ICON_FONT,
        paddingLeft: 40,
        paddingRight:10,
        color: AppStyles.color.icon,
        fontSize: 60
    }
});

export default styles;