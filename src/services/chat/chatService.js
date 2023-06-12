import env from '../../../env';
import {  Alert
} from 'react-native'

const searchUsers = async (search) => {
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'localtonet-skip-warning':true
        }};

    return await fetch(env.BACKEND_SERVER_URL + "/api/user/name/?query=" + search, options);
}

    const sendMessage = async (message,receiverId, senderId, file) => {
        console.log("obj: ",JSON.stringify(file))
       var extension  = file?.fileName?.split('.')?.pop()??'';
        // if we have file, it will be sent as multipart/form-data
        // otherwise, it will be sent as application/json
        var obj = {
            content: message,
            sender: '64806a5106f17a0d2c1c1558',//senderId,
            receiver: '6481af888e2dffa6a40bf714',//receiverId,
            file: file?.base64,
            fileName: file?.fileName,
            fileType: extension,
        };
        // console.log("obj: ",JSON.stringify(obj));
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'localtonet-skip-warning':true
            },
            body: JSON.stringify(obj)
            //  files

        }

        return await fetch(env.BACKEND_SERVER_URL + '/api/message', options)
            .then(response =>{
                console.log("response: ",response);
                return response.json()})
            .catch(e=>{console.log(e.message); throw e;});
    } 

const getChatByIds = async (sender, receiver) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'localtonet-skip-warning':true
        },
        body: JSON.stringify({sender, receiver}) 
    };
    return await fetch(env.BACKEND_SERVER_URL + "/api/message/room/chat" , options).then(response => response.json());
}


export {sendMessage,searchUsers, getChatByIds};