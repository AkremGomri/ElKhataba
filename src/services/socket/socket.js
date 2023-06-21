/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { io } from 'socket.io-client';
import { getData, getToken } from '../../services/auth/asyncStorage';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import env from '../../../env';
import { getChatByIds } from '../chat/chatService';

var MessageList = [];
var messages = new BehaviorSubject([]);
var messages$ = messages.asObservable();
var roomId = new BehaviorSubject(null);
var roomId$ = roomId.asObservable();
// this is ID of logged in user
// it can be used to check if message sender is this user or other one
var userId = null;



var socket = null;
try {
    socket = io(env.BACKEND_SERVER_URL, {
        query: { token: getToken() },
        extraHeaders: {
            'localtonet-skip-warning': true
        },
    });
    socket.on('connect', function () {
        console.log('connected to server');
        // register user to this connection
        getData("userId").then((userId) => {
            socket.emit('register', userId.value);
            socket.on('incomingMessage', (data) => {
                console.log('NEW MESSAGE RECEIVED: ', data);
                // check if the message is for the current user
                //if (data.room_id == roomId) {
                    firstValueFrom(messages$).then((msgs) => {
                        msgs.push({ ...data, name: (data.sender_id == userId) ? 'You' : data.sender_name });
                        messages.next(msgs);
                    });
                // }
                // else {
                //     console.log("message is not for this room. Handle accordingly");
                // }
            })
        });
    });
}
catch (err) {
    console.log(err);
}

const switchChat = async (userId) => {
    console.log("switchChat", userId);
    //let msgs= [...messages.value];
    messages.next([]);
    let currentUserId = await getData("userId");

    let chat = await getChatByIds(currentUserId.value, userId);
    console.log("chat: ", chat)
    room_id = chat.room_id;
    userId = currentUserId.value;
    roomId.next(room_id);
    let msgs = chat.roomChat.map(x => { return { ...x, name: (x.sender == room_id) ? 'You' : x.sender_name } });
    // sort msgs by time
    msgs.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log("settings msgs: ", msgs.length)
    messages.next(msgs);
    return chat.room_id;
}

export default { socket, messages$, switchChat, roomId$ };