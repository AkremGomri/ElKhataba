/* eslint-disable prettier/prettier */
import React from 'react';
import { Text ,FlatList} from 'react-native';

const OnConstruction = () => {
  return (
    <FlatList
        data={props.notifs}
        renderItem={({ item }) => ( <Notifs update={props.update} notif={item} /> )}
        keyExtractor={notif => notif._id}
        />
  )
}

export default OnConstruction