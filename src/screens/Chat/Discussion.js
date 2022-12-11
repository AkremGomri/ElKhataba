import React , { useLayoutEffect, useState }from 'react'
import 'react-native-gesture-handler';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable} from 'react-native'
import { getData } from '../../services/auth/asyncStorage';
import MessageComponent from "../../components/Message/MessageComponent";

const Discussion= ({ route, navigation }) =>{
  const [chatMessages, setChatMessages] = useState([
    {
        id: "1",
        text: "Hello guys, welcome!",
        time: "07:50",
        user: "Tomer",
    },
    {
        id: "2",
        text: "Hi Tomer, thank you! 😇",
        time: "08:50",
        user: "David",
    },
]);
const [message, setMessage] = useState("");
const [user, setUser] = useState("");

//👇🏻 Access the chatroom's name and id
const { name, id ,Photo} = route.params;

//👇🏻 This function gets the username saved on AsyncStorage
const getUsername = async () => {
    try {
        //const value = Json.parse(getData());
        //console.log("value: ",value);
        if (name !== null) {
            setUser(name);
        }
    } catch (e) {
        console.error("Error while loading username!");
    }
};

//👇🏻 Sets the header title to the name chatroom's name
useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    getUsername()
}, []);

/*👇🏻 
    This function gets the time the user sends a message, then 
    logs the username, message, and the timestamp to the console.
 */
const handleNewMessage = () => {
    const hour =
        new Date().getHours() < 10
            ? `0${new Date().getHours()}`
            : `${new Date().getHours()}`;

    const mins =
        new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : `${new Date().getMinutes()}`;

    console.log({
        message,
        user,
        timestamp: { hour, mins },
    });
};
  return (
    
    <View style={styles.messagingscreen}>
    <View
        style={[
            styles.messagingscreen,
            { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
    >
        {chatMessages[0] ? (
            <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                    <MessageComponent item={item} user={user} photo={Photo} />
                )}
                keyExtractor={(item) => item.id}
            />
        ) : (
            ""
        )}
    </View>

    <View style={styles.messaginginputContainer}>
        <TextInput
            style={styles.messaginginput}
            onChangeText={(value) => setMessage(value)}
        />
        <Pressable
            style={styles.messagingbuttonContainer}
            onPress={handleNewMessage}
        >
            <View>
                <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </View>
        </Pressable>
    </View>
</View>
  
  )
}

const styles = StyleSheet.create({
  loginscreen: {
      flex: 1,
      backgroundColor: "#EEF1FF",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      width: "100%",
  },
  loginheading: {
      fontSize: 26,
      marginBottom: 10,
  },
  logininputContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
  },
  logininput: {
      borderWidth: 1,
      width: "90%",
      padding: 8,
      borderRadius: 2,
  },
  loginbutton: {
      backgroundColor: "green",
      padding: 12,
      marginVertical: 10,
      width: "60%",
      borderRadius: "50%",
      elevation: 1,
  },
  loginbuttonText: {
      textAlign: "center",
      color: "#fff",
      fontWeight: "600",
  },
  chatscreen: {
      backgroundColor: "#F7F7F7",
      flex: 1,
      padding: 10,
      position: "relative",
  },
  chatheading: {
      fontSize: 24,
      fontWeight: "bold",
      color: "green",
  },
  chattopContainer: {
      backgroundColor: "#F7F7F7",
      height: 70,
      width: "100%",
      padding: 20,
      justifyContent: "center",
      marginBottom: 15,
      elevation: 2,
  },
  chatheader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
  },
  chatlistContainer: {
      paddingHorizontal: 10,
  },
  chatemptyContainer: {
      width: "100%",
      height: "80%",
      alignItems: "center",
      justifyContent: "center",
  },
  chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
  messagingscreen: {
      flex: 1,
  },
  messaginginputContainer: {
      width: "100%",
      minHeight: 100,
      backgroundColor: "white",
      paddingVertical: 30,
      paddingHorizontal: 15,
      justifyContent: "center",
      flexDirection: "row",
  },
  messaginginput: {
      borderWidth: 1,
      padding: 15,
      flex: 1,
      marginRight: 10,
      borderRadius: 20,
  },
  messagingbuttonContainer: {
      width: "30%",
      backgroundColor: "green",
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
  },
  modalbutton: {
      width: "40%",
      height: 45,
      backgroundColor: "green",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
  },
  modalbuttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
  },
  modaltext: {
      color: "#fff",
  },
  modalContainer: {
      width: "100%",
      borderTopColor: "#ddd",
      borderTopWidth: 1,
      elevation: 1,
      height: 400,
      backgroundColor: "#fff",
      position: "absolute",
      bottom: 0,
      zIndex: 10,
      paddingVertical: 50,
      paddingHorizontal: 20,
  },
  modalinput: {
      borderWidth: 2,
      padding: 15,
  },
  modalsubheading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
  },
  mmessageWrapper: {
      width: "100%",
      alignItems: "flex-start",
      marginBottom: 15,
  },
  mmessage: {
      maxWidth: "50%",
      backgroundColor: "#f5ccc2",
      padding: 15,
      borderRadius: 10,
      marginBottom: 2,
  },
  mvatar: {
      marginRight: 5,
  },
  cchat: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 5,
      paddingHorizontal: 15,
      backgroundColor: "#fff",
      height: 80,
      marginBottom: 10,
  },
  cavatar: {
      marginRight: 15,
  },
  cusername: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: "bold",
  },
  cmessage: {
      fontSize: 14,
      opacity: 0.7,
  },
  crightContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
  },
  ctime: {
      opacity: 0.5,
  },
});
export default Discussion




