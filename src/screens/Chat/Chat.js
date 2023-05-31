import { View, Text, FlatList, TouchableOpacity, Image, Stack, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { getToken } from '../../services/auth/asyncStorage';
import { ListItem, SearchBar } from "react-native-elements";
// import { Badge, Icon, withBadge } from '@rneui/themed';
import styles from './styles'
import env from '../../../env';
import socket from '../../services/socket/socket';
import { Context } from '../../services/context/Context';
import { searchUsers } from '../../services/chat/chatService';

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
  const [ context, setContext] = useContext(Context);

  const ac = new AbortController();
  useEffect(() => {
    Promise.all([

      searchFunction('')
      //fetchData(),
     // setFilteredDataSource(usersList)
    ])
    return () => ac.abort();
  }, [])


 function searchFunction(text) {
 searchUsers(text).then((res) => {
      res.json()
        
        .then((responseJson) => {
          console.log("responseJson: ",responseJson);
          setUsersList(responseJson.data);
          setFilteredDataSource(responseJson.data);
        })
    })
    setSearch(text);
 
};
  return (
   // <ScrollView keyboardShouldPersistTaps='always' >
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
          {/* <Badge
            status="error"
            containerStyle={{ position: 'absolute', top:1, left: 60 }}
          /> */}
          {/*  <Badge
            status="success"
            containerStyle={{ position: 'absolute', top:1, left: 60 }}
          /> */}
                  <Text  style={styles.Text} item={item} > {item.pseudo}</Text>
              </View>
              )} />
        </View>
      </TouchableOpacity>
     
      
<TouchableOpacity style={styles.touch}>
          
        <View style={styles.container}>
      
<FlatList 
data={filteredDataSource!==null?filteredDataSource:usersList}
  renderItem={
    ({ item }) => ( 
    <View style={styles.View2}>
      <TouchableOpacity onPress={() => {
        //  props.navigation.navigate("Discussion");
           ///👇🏻 Navigates to the Messaging screen
           console.log(item.fullname);
        socket.startDiscussion(context, item._id)

    props.navigation.navigate("Discussion", {
        name: item.fullname,
        id: item._id,
        photo:item.Photo,
    });
  
        }} >
          <Image 
        style={{ width: 60, height: 60 ,borderRadius: 400/ 2}}
        source={item.Photo ? {uri: item.Photo}: (item.gender == "homme") ? require("../../../assets/images/man.png") : require("../../../assets/images/woman.png")
        }></Image>
        </TouchableOpacity>
      
      <Text  style={styles.Text} item={item} > {item.fullname} (</Text>
      <Text  style={styles.Text} item={item} > {item.pseudo})</Text>
    </View>
    )} />
 
</View>

</TouchableOpacity> 

    </View>
  //  </ScrollView>
    )
}

export default Chat