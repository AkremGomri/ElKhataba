import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import 'react-native-gesture-handler';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, Alert, Image } from 'react-native'
import { getData } from '../../services/auth/asyncStorage';
import MessageComponent from "../../components/Message/MessageComponent";
import socket from '../../services/socket/socket';
import { Context } from '../../services/context/Context';
import { sendMessage } from '../../services/chat/chatService';
import { getUserById } from '../../services/auth/userService';
import { launchImageLibrary } from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { firstValueFrom } from 'rxjs';

const Discussion = ({ route, navigation }) => {
    const [context, setContext] = useContext(Context);
    //   const messageList = useRef();
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [senderId, setSenderId] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [sender, setSender] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const { name, id, Photo } = route.params;
    let scrollRef = React.useRef(null);

    const [roomId, setRoomId] = useState()
    // const ac = new AbortController();
    useEffect(() => {
        getData("userId").then((res) => {
            let userId = res.value;
            
            setSenderId(userId);
            setReceiverId(id);
            Promise.all([
                getUserById(id).then(response => response.json()).then((res) => {
                    setReceiver(res);
                }),
                getUserById(userId).then(response => response.json()).then((res) => {
                    setSender(res);
                })
            ]).then(async () => {
                await socket.switchChat(id);
                })
        });

        
        var messagesSubscription = [];
        messagesSubscription.push(socket.roomId$.subscribe((data) => {
            // console.log('new room id received: ', data);
            setRoomId(data);
        }));
        messagesSubscription.push(socket.messages$.subscribe(async (data) => {
            var _roomId=await firstValueFrom(socket.roomId$);
            // console.log('new message received: ', data.length, _roomId);

            // data.forEach((msg) => {console.log(msg)})
            // filter data to get only messages for this room
            data = data.filter((msg) => msg.room_id == _roomId);
            // console.log('new message received: ', data.length, roomId);
            setChatMessages(data ?? []);
        }));

        return () => {
            messagesSubscription?.forEach(x=>{x?.unsubscribe()});
        }
    }, [])

    //👇🏻 This function gets the username saved on AsyncStorage
    const getUserId = async () => {
        try {
            //const value = Json.parse(getData());
            //console.log("value: ",value);
            if (id !== null) {
                setUser(id);
            }
        } catch (e) {
            console.error("Error while loading username!", e);
        }
    };

    //👇🏻 Sets the header title to the name chatroom's name
    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUserId()
    }, []);

    /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
    const handleNewMessage = () => {
        // to avoid sending message if both message and file are empty
        if (!message && !file) return;
        setIsSending(true);
        sendMessage(message, receiverId, senderId, file)
            .then((data) => {
                var newChat = [...chatMessages];
                var msg = data.messages;
                // console.log("message: ", msg)
                setChatMessages(newChat);
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
            })
            .finally(() => {
                setMessage("");
                setIsSending(false);
            });

    };

    const handleFile = async () => {
        var result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true,
        });
        if (!result.didCancel) {
            setFile(result.assets[0]);
        }
    }
    return (

        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.chatWrapper,
                    { paddingVertical: 15, paddingHorizontal: 10, overflow: 'scroll' },
                ]}
            >
                {chatMessages[0] && (
                    <FlatList
                        data={chatMessages}
                        style={styles.chat}
                        ref={(it) => (scrollRef.current = it)}
                        onContentSizeChange={() =>
                            scrollRef.current?.scrollToEnd({ animated: false })
                        }
                        renderItem={({ item }) => (
                            <MessageComponent message={item} user={senderId} />
                        )}
                        keyExtractor={(item, index) => `${item.date} - ${index}`}
                    />
                )}
            </View>
            {file!=null && <View>
                <Image source={{ uri: file?.uri }} style={{ width: 70, height: 70 }} />
                <Pressable
                    style={styles.clearImage}
                    onPress={() => setFile(null)}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>x</Text>
                </Pressable>
            </View>
            }
            <View style={styles.messagingInputContainer}>
                {/* {file && <Image source={{ uri: file.uri }} style={{ width: 50, height: 50 }} />} */}
                <Pressable
                    style={styles.fileButtonContainer}
                    onPress={handleFile}
                >
                    <FontAwesomeIcon icon={faPaperclip} size={20} color="#000" />
                </Pressable>
                <TextInput
                    style={styles.messagingInput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text
                            style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    chatWrapper: {
        backgroundColor: "#fff",
        flex: 1,
        overflow: 'scroll',
    },
    chat: {
    },

    messagingscreen: {
        flex: 1,
        backgroundColor: '#fff'
    },
    messagingInputContainer: {
        width: "100%",
        backgroundColor: "white",
        paddingBottom: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        flexDirection: "row",
    },
    messagingInput: {
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 10,
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
    },
    clearImage: {
        position: 'absolute',
        top: 0,
        // we have to add 45 because button with is 25 and width of image is 70 i.e., 45+25=70
        left: 45,
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: '#00000099',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messagingbuttonContainer: {
        width: "30%",
        backgroundColor: "green",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    fileButtonContainer: {
        width: 30,
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




