/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import useEffectFetch from './../../services/useEffectFetch';
import env from '../../../env';
import { Button } from 'react-native';

const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const {data, isPending, error} = useEffectFetch(env.BACKEND_SERVER_URL +":"+ env.PORT);
  return (
    <View >
        <ScrollView snapToInterval={height} decelerationRate="fast" horizontal nestedScrollEnabled={true}>
          <FlatList
           horizontal
            data={data}
            renderItem={
            ({ item }) => <Image source={{ uri: item.Photo}}  style = {{ width, height }} />
            }
            keyExtractor={item => item._id}
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
    width,
    height,
  },
  view: {
    borderWidth: 4,
    borderColor: "#20232a",

  }
});

export default HomeScreen;