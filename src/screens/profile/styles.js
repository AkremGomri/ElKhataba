
import { StyleSheet,StatusBar } from 'react-native'
import { AppStyles } from '../../styles/generalStyles/AppStyles';

const styles = StyleSheet.create({
    mainButtoncontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:45,
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
        fontWeight: 'bold',
        color: AppStyles.color.tint,
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

});

export default styles;