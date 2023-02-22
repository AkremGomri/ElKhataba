/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import io from 'socket.io-client';
import {getData, getToken} from '../../services/auth/asyncStorage';
import env from '../../../env';

var MessageList = [];

// handshake
const run = (backend, token) => io.connect(backend, {
    query: {token: token},
});

// const s = io.connect(env.BACKEND_SERVER_URL, {         
//     query: {token: getToken()}
// })
  
const listen = (socket) => {
    

    // socket.emit('test', "this is a test");
    socket.on('connect', (s) => {
        // console.log("connected: " + socket.connected);
        // console.log("I am connected with id: ", socket.id);
        // socket.emit("authentification", getData("userId"));
    })

    socket.on("disconnect", (reason) => {
        console.log(" you have diconnected with reason: " + reason); // undefined
    });
    
    socket.on("connect_error", (reason) => {
        console.log("connect_error reason2: " + reason);
        // setTimeout(() => {
        //     socket.connect();
        // }, 1000);
    });

    socket.io.on("reconnection_attempt", () => {
        console.log("attempting to reconnect");
    });
/*********************** CHOUFLI7AL  **********/
    socket.on("user connected", (data) => {
        console.log("new user: ",data);
        socket.emit('trying to connect with the new user', data.userId)
    })

    socket.io.on("reconnect", () => {
        console.log("reconnect");
    });

    // socket.on("message", (data) => {
    //     console.log("data : ",data);
    // });

    // socket.on("private message", (data, senderId, roomId, date) => {
    //     console.log("dataaaaaaaa : ",data);
    //     console.log("from : ",senderId);
    //     console.log("roomId : ",roomId);
    //     MessageList.push({senderId, msg: data, roomId, date });
    // });

    socket.on("room entred", (res) => {
        console.log("x set to ", res.data);
        x = res.data
    })
    socket.on("new friend just connected", (senderSocketId, senderId) => {
        // console.log("Friend with this id: " + senderId + " is connected");
        // console.log("senderSocketId: ",senderSocketId);
        socket.emit("notify he got connected", senderSocketId, senderId)
    })

    socket.on("come join", (roomId) => {
        console.log("trying to join: ",roomId);
        socket.emit("join room", roomId)
    })
}

const sendMessage = (socket, message, destinationId) => {
    // console.log("sendMessage: socketId: ",socket.userId);
    // roomId = [ destinationId, socket.userId].sort().join("");
    // console.log("sendMessage: room: ",roomId);
    
    socket.emit("private message",{msg: message, userId: destinationId, date: new Date() });
}

const disconnect = () =>{
    socket.emit('disconn', userId);
}
const startDiscussion = (socket, destinationId) => {
    console.log('startDiscussion: ',destinationId);
    socket.emit('join private ;', destinationId);
}

const getMessageList = (roomId) => {
    console.log(MessageList);
    const result = MessageList.filter((elem) => elem.roomId == roomId)
    return result;
}

export default {run, listen, sendMessage, disconnect, startDiscussion, getMessageList};