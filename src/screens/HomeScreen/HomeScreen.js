/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData([`https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-on-180015809`, `https://www.shutterstock.com/image-vector/smartphone-speech-bubble-social-media-icons-249041452`])
  // }, [])

  const data = [`https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-on-180015809`, `https://www.shutterstock.com/image-vector/smartphone-speech-bubble-social-media-icons-249041452`]
  return (
    <View>
      <Text>akrem</Text>
        <ScrollView snapToInterval={width} decelerationRate="fast" horizontal>
          <FlatList
            data={data}
            renderItem={
              ({item}) =><Image style={styles.container} source={{ item }} />
            }
            keyExtractor={item => item}
          />
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    // width: width * data.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default HomeScreen;