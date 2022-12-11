import React, {useState} from 'react';
import {Image, Text, View,StyleSheet} from 'react-native';

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
    
    loading: {paddingLeft: '35%', paddingTop: '40%'},
    imageContainer: {height: 300, width: '80%',justifyContent: "center"},
    detailPhoto: {
        justifyContent: "center",
      height: 340, width: '90%',
     resizeMode: 'cover',borderRadius: 50},

  

  });
export default ImageComponent;