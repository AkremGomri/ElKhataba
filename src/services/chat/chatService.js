import env from '../../../env';
import {  Alert
} from 'react-native'

const searchUsers = async (search) => {
    console.log("________________search: ",search,env.BACKEND_SERVER_URL + "/api/user/name/?query=" + search);
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'localtonet-skip-warning':true
        }};

    return await fetch(env.BACKEND_SERVER_URL + "/api/user/name/?query=" + search, options);
}

    const sendMessage = async (message,receiverId, senderId) => {
        var obj={
            content:message,
            sender:senderId,
            receiver:receiverId,
        }
        console.log('sending message', obj)
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'localtonet-skip-warning':true
            },
            body: JSON.stringify(obj),
        }

        return await fetch(env.BACKEND_SERVER_URL + '/api/message', options)
            .then(response => response.json());
    } 

const getChatByIds = async (sender, receiver) => {
    console.log('getting chat', sender, receiver)
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'localtonet-skip-warning':true
        },
        body: JSON.stringify({sender, receiver}) 
    };
    return await fetch(env.BACKEND_SERVER_URL + "/api/message/room/chat" , options);
}


export {sendMessage,searchUsers, getChatByIds};