import { View, Text,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { getToken } from '../../services/auth/asyncStorage';
import env from '../../../env';

export default function List() {
    const [usersList, setUsersList] = useState('')
    useEffect(() => {
        fetchData();
        console.warn("les utilisateurs: ",usersList);
       
      }, [])

      async function fetchData (){
        const token = await getToken();
        options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }
  
        fetch(env.BACKEND_SERVER_URL +"/recommanded", options )
          .then((res) => {
            console.warn("status : ",res.status);
            res.json()
              .then((data) => {
                setUsersList(data);
              })
          })
      }
  return (
    <View>
      <Text>Chat</Text>
      <FlatList
         data={usersList}
         
        renderItem={({ item, index, separators }) => <Text item={item} > {item.fullname} </Text>}
        keyExtractor={item => item._id}
      />
    </View>
  )
}