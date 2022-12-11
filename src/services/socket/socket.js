import io from "socket.io-client"
import {getData} from '../../services/auth/asyncStorage'

const run = (backend, token) => io.connect(backend, {         
    query: {token: token}
})
  
const listen = (socket) => {
    socket.emit('test', "this is a test");
    socket.on('connect', (s) => {
        // console.log("connected: " + socket.connected);
        console.log("I am connected with id: ", socket.id);
        socket.emit("authentification", getData("userId"));
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

    socket.on("private message", (data, senderId) => {
        console.log("dataaaaaaaa : ",data);
        console.log("from : ",senderId);
    });

    socket.on("room entred", (res) => {
        console.log("x set to ", res.data);
        x = res.data
    })
    socket.on("new user connected", (senderSocketId, senderId) => {
        console.log("Friend with this id: " + senderId + " is connected");
        console.log("senderSocketId: ",senderSocketId);
        socket.emit("notify he got connected", senderSocketId, senderId)
    })

    socket.on("come join", (roomId) => {
        console.log("trying to join: ",roomId);
        socket.emit("join room", roomId)
    })
}

const sendMessage = (message, destinationId) => {
    socket.emit("private message",{msg: message, userId: destinationId});
}

const disconnect = () =>{
    socket.emit('disconn', userId);
}
const startDiscussion = (socket, destinationId) => {
    console.log('startDiscussion: ',destinationId);
    socket.emit('join private room', destinationId);
}

export default {run, listen, sendMessage, disconnect, startDiscussion};