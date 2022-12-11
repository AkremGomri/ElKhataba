import { View, Text, FlatList, TouchableOpacity, Image, Stack, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/auth/asyncStorage';
import { ListItem, SearchBar } from "react-native-elements";
import { Badge, Icon, withBadge } from '@rneui/themed';
import styles from './styles'
import env from '../../../env';


Array.prototype.chunk = function (n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

const Chat = (props) => {
  const [search, setSearch] = useState('')
  const [filteredDataSource, setFilteredDataSource] = useState(null)
  const [usersList, setUsersList] = useState([]);

  const ac = new AbortController();
  useEffect(() => {
    Promise.all([
      fetchData(),
     // setFilteredDataSource(usersList)
    ])
    return () => ac.abort();
  }, [])
  async function fetchData() {
    const token = await getToken();
    options = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      signal: ac.signal
    }
    fetch(env.BACKEND_SERVER_URL + "/getMyMatches", options)
      .then((res) => {
        console.warn("status : ", res.status);
        res.json()
          .then((responseJson) => {
            setUsersList(responseJson.data.Matches);
            console.log("utilisateursss", usersList);
          })
      })
  }

  searchFunction = (text) => {
    // Check if searched text is not blank
  if (text) {
    const newData = usersList.filter(function (item) {
      const itemData = item.fullname 
        ? item.fullname.toUpperCase() 
        : ''.toUpperCase();
        const pseudoData= item.pseudo
        ? item.pseudo.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1 || pseudoData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    //setdata(newData);
    setSearch(text);
  } else {
    setFilteredDataSource(usersList);
    setSearch(text);
  }
};
  return (
    <ScrollView keyboardShouldPersistTaps='always' >
    <View>
      <Text style={styles.titre}>Discussion</Text>
      <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={search}
          onChangeText={(text) => searchFunction(text)}
          autoCorrect={false}
        />
      <TouchableOpacity style={styles.touch}
        /* onPress={(data) => {
          props.navigation.navigate("Discussion");
        }} */
        >
        <View style={styles.container}>
        
          <FlatList data={usersList}
          horizontal
            renderItem={
              ({ item }) => (<View style={styles.View1}>
                  <Image
                rounded
                  style={{ width: 60, height: 60 ,margin:5,  borderRadius: 400/ 2}}
                  source={item.Photo ? {uri: item.Photo}: (item.gender == "homme") ? require("../../../assets/images/man.png") : require("../../../assets/images/woman.png")
                     
                  }></Image>
          <Badge
            status="error"
            containerStyle={{ position: 'absolute', top:1, left: 60 }}
          />
          {/*  <Badge
            status="success"
            containerStyle={{ position: 'absolute', top:1, left: 60 }}
          /> */}
                  <Text  style={styles.Text} item={item} > {item.pseudo}</Text>
              </View>
              )} />
        </View>
      </TouchableOpacity>
     
      
<TouchableOpacity style={styles.touch}
       /*  onPress={(data) => {
          props.navigation.navigate("Discussion");
        }} */>
          
        <View style={styles.container}>
      
<FlatList 
data={filteredDataSource!==null?filteredDataSource:usersList}
  renderItem={
    ({ item }) => (<View style={styles.View2}>
      <Image
        style={{ width: 60, height: 60 ,borderRadius: 400/ 2}}
        source={item.Photo ? {uri: item.Photo}: (item.gender == "homme") ? require("../../../assets/images/man.png") : require("../../../assets/images/woman.png")
        }></Image>
      <Text  style={styles.Text} item={item} > {item.fullname} (</Text>
      <Text  style={styles.Text} item={item} > {item.pseudo})</Text>
    </View>
    )} />
 
</View>

</TouchableOpacity> 

    </View>
    </ScrollView>
    )
}

export default Chat