import React from 'react';
import { Text, Button, View } from "react-native";


export default function HomeScreen({ navigation: { navigate } }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the home screen of the app</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigate('Profile', { caption: 'Some caption' })}
      />
    </View>
  )
}
