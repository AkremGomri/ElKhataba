/* eslint-disable prettier/prettier */

import { StyleSheet, Dimensions } from 'react-native';
import { AppStyles } from '../../styles/generalStyles/AppStyles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        
      },
      titre: {
        fontSize:AppStyles.fontSize.title,
        fontFamily:AppStyles.fontFamily.fontFam,
        color: AppStyles.color.tint,
        marginBottom:10
      },
      View1: {
        flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
        flexDirection: "column",
        height: 62,
        marginTop:10,
        marginBottom:20
      },
      View2:{
        flexDirection: "row",
        height: 62,
        marginTop:10,
        marginBottom:10
      },
      touch: {
        flexDirection: "row",
        marginBottom:5,
        alignItems: "flex-start"
      },
      Text: {
        fontSize:AppStyles.fontSize.normal,
        color: AppStyles.color.text
      }
  
  });
