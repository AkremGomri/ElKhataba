import React, {useState} from 'react';
import {Image, Text, View,StyleSheet} from 'react-native';
import colors from '../../../assets/theme/color';

function ImageComponent({src}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  return (
    <View style={styles.imageContainer}>
      {isLoading && <Text style={styles.loading}>Loading image</Text>}
      <View>
        <Image
          onLoadEnd={onLoadEnd}
          onError={onError}
          onLoadStart={onLoadStart}
          style={styles.detailPhoto}
          source={{uri: src}}
        />
      </View>
    </View>
  );
}
 const styles= StyleSheet.create({
    
    loading: {paddingLeft: '35%', paddingTop: '5%'},
    imageContainer: {height: 300, width: '100%'},
    detailPhoto: {
        justifyContent: "center",
      height: 300, width: '90%',
     resizeMode: 'cover',borderRadius: 100},

  

  });
export default ImageComponent;