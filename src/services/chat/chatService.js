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
        senderId:senderId,
        receiverId:receiverId,
    }
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    }

    return await fetch(env.BACKEND_SERVER_URL + '', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return   JSON.stringify(data);
        });
} 


export {sendMessage,searchUsers};