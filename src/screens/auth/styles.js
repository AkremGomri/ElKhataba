import { StyleSheet} from 'react-native';
import { AppStyles } from '../../styles/generalStyles/AppStyles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    or: {
      color: 'black',
      marginTop: 40,
      marginBottom: 10,
    },
    title: {
      fontFamily: AppStyles.fontFamily.fontFam,
      fontSize: AppStyles.fontSize.title,
      //fontWeight: 'bold',
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 50,
    },
    leftTitle: {
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 20,
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: AppStyles.fontSize.content,
      color: AppStyles.color.text,
    },
    loginContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30,
    },
    loginText: {
      color: AppStyles.color.white,
      fontFamily: AppStyles.fontFamily.fontFam,
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main,
    },
     
    body: {
        fontSize:20,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        color: AppStyles.color.text,
        fontFamily: AppStyles.fontFamily.fontFam,
    },
    facebookContainer: {
      width: '15%',
      height :'8%',
    },
/*  
    googleContainer: {
      width: '20%',
      height :'10%',
      float:'right',
     
    }, */
    image: {
        flex: 1,
        justifyContent: "center",
        width: '100%', height: '100%'

    },
    topTitle: {
        marginTop: 10,
        marginBottom: 50,
        fontSize: 30,
        color: AppStyles.color.title,
        placement: "top",
        fontFamily: AppStyles.fontFamily.fontFam,

    },
      suivantContainer: {
        width:90,
        borderRadius: AppStyles.borderRadius.main,
        padding:0,
        marginTop: 10,
        marginLeft: 300,
    },
    datePickerStyle: {
        width: 230,
        fontSize: 500,
        marginTop: 40,

    },
    scrollView: {
        marginHorizontal: 20,
    },
    detailPhoto :{
        justifyContent: "center",
        height: 260, width: '90%',
       resizeMode: 'cover',borderRadius: 100
    },
      buttonText: {
    
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
        fontFamily: AppStyles.fontFamily.fontFam,
    
      },
      signupContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 8,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop: 15,
      },
      signupText: {
        color: AppStyles.color.tint,
        fontFamily: AppStyles.fontFamily.fontFam,
        textAlign:'center'
      },
      images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
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
  buttonStyle: {
    width: '100%',
    padding: 20,
    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#666666',
    borderBottomColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.62,
    elevation: 4,
  },
  });
  export default styles;