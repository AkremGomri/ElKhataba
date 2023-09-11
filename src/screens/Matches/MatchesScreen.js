import { View, Text, FlatList, TouchableOpacity, Image, Stack, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/auth/asyncStorage';
import styles from './styles'
import env from '../../../env';

export default function MatchesScreen() {
  const [search, setSearch] = useState('');
  const [usersList, setUsersList] = useState([]);

  const ac = new AbortController();
  useEffect(() => {
    Promise.all([
      fetchData(),
    ])
    return () => ac.abort();
  }, [])
  async function fetchData() {
    const token = await getToken();
    options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      signal: ac.signal
    }
    fetch(env.BACKEND_SERVER_URL + "/user/getMyMatches", options)
      .then((res) => {
        console.warn("status : ", res.status);
        res.json()
          .then((responseJson) => {
            setUsersList(responseJson.data.Matches);
            console.log("utilisateursss", usersList);
          })
      })
  }

  return (
    <ScrollView keyboardShouldPersistTaps='always' >
      <View>
        <Text style={styles.titre}>Liste de mes amis</Text>

        <TouchableOpacity style={styles.touch}
       /*  onPress={(data) => {
          props.navigation.navigate("Discussion");
        }} */>

          <View style={styles.container}>

            <FlatList
              data={usersList}
              renderItem={
                ({ item }) => (<View style={styles.View2}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 400 / 2 }}
                    source={item.Photo ? { uri: item.Photo } : (item.gender == "homme") ? require("../../../assets/images/man.png") : require("../../../assets/images/woman.png")
                    }></Image>
                  <Text style={styles.Text} item={item} > {item.fullname} (</Text>
                  <Text style={styles.Text} item={item} > {item.pseudo})</Text>
                </View>
                )} />

          </View>

        </TouchableOpacity>

      </View>
    </ScrollView>
  )
};