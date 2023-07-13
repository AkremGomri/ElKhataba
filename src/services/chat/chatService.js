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

    return await fetch(env.BACKEND_SERVER_URL + "/user/name/?query=" + search, options);
}

    const sendMessage = async (message,receiverId, senderId, file) => {
       var extension  = file?.fileName?.split('.')?.pop()??'';
        // if we have file, it will be sent as multipart/form-data
        // otherwise, it will be sent as application/json
        var obj = {
            content: message,
            sender: senderId,
            receiver: receiverId,
            file: file?.base64,
            fileName: file?.fileName,
            fileType: extension,
        };
        //console.log("obj length: ",JSON.stringify(obj).length);

        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
            //  files

        }

        //console.log("options: ",options);
        return await fetch(env.BACKEND_SERVER_URL + '/message', options)
            .then(response =>{
                console.log("response: ",response);
                if(response.status === 413){
                    throw new Error("File too large to upload to server. Please select a smaller file.");
                }
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
    console.log("options: ",options);
    return await fetch(env.BACKEND_SERVER_URL + "/message/room/chat" , options).then(response => response.json());
}


export {sendMessage,searchUsers, getChatByIds};