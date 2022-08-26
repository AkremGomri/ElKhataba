import { AppStyles } from '../../styles/generalStyles/AppStyles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 150,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%', height: '100%'

  },
    logo: {
      width: 200,
      height: 200,
    },
    title: {
      fontSize: AppStyles.fontSize.title,
      fontFamily: AppStyles.fontFamily.fontFam,
      color: AppStyles.color.tint,
      marginTop: 20,
      textAlign: 'center',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
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
    },
    spinner: {
      marginTop: 200,
    },
  });

  export default styles;