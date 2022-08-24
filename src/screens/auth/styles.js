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
      fontSize: AppStyles.fontSize.title,
      fontWeight: 'bold',
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
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    facebookContainer: {
      width: 192,
      backgroundColor: AppStyles.color.facebook,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30,
    },
    facebookText: {
      color: AppStyles.color.white,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        backgroundSize: "cover",

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
      suivantContainer: {
        width: 100,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginLeft: 200,
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
        fontWeight: 'bold',
        color: 'black'
    
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
  });
  export default styles;