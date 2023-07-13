import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import moment from 'moment';
//import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from 'react-native';

import IconFeather from 'react-native-vector-icons/Feather';
export default function MessageComponent({ message, user }) {
    // console.log("message: ",message);

    const { height, width } = useWindowDimensions();

    const isMyMessage = message.sender_id === user;
    
    /// photo of sender
    /// it will always be null
    var photo = message.photo;
    if (!photo || photo == '') photo = (message.gender == "homme") ? require("../../../assets/images/man.png") : require("../../../assets/images/woman.png")

    /// file photo of message content
    const msgPhoto = message.file ==null || message.file==""?null:message.file;

    /// get message time
    /// if message is today, return hh:mm a
    /// if message is yesterday, return yesterday
    /// if message is older than yesterday, return DD/MM/YYYY
    const getMessageTime = (date) => {
        let msgDate = moment.utc(date).local();
        let currentDate = moment();
        let diff = currentDate.diff(msgDate, 'days');
        if (diff == 0) {
            return msgDate.format('hh:mm a');
        }
        else if (diff == 1) {
            return 'Yesterday';
        }
        else {
            return msgDate.format('DD/MM/YYYY');
        }

    }
    const flexDirection = isMyMessage ? "row-reverse" : "row";
    const alignSelf = isMyMessage ? "flex-end" : "flex-start";
    return (
        <View>
            <View style={styles.mmessageWrapper}>
                <View style={{
                    display: 'flex',
                    flexDirection: flexDirection,
                    alignSelf: alignSelf,
                    alignItems: "center",
                    backgroundColor: isMyMessage?"rgb(194, 243, 194)":"#e2e2e2",
                    borderRadius:10,
                    padding:5,
                    width:width-80,
                }}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 400 / 2 }}
                        source={require("../../../assets/images/man.png")}
                    >
                    </Image>
                    <View style={{...styles.message, width:width-160}}>
                        <Text style={styles.name}>{message.name}</Text>
                        {msgPhoto && <Image
                        style={{ width:100,height:100, maxWidth: width-220, maxHeight: 220, borderRadius:5 }}
                        source={{uri:msgPhoto}}
                    >
                    </Image>}
                        <Text>{message.content}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 40, marginRight:40, display:'flex', alignSelf:alignSelf }}>{getMessageTime(message.time)}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    messageContainer: {
        width: '100%',
    },

    mmessageWrapper: {
        width: "100%",
        display: 'flex',
        borderRadius: 5,
        marginHorizontal: 5,
        padding: 5
    },
    message:{
        //flexGrow:1
        

    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    ctime: {
        opacity: 0.5,
    },
});