import { getData } from './asyncStorage';
import env from '../../../env';
import {
    Alert
} from 'react-native'

const getUser = async () => {
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    const userId = (await getData("userId")).value;
    await fetch(env.BACKEND_SERVER_URL + ":" + env.PORT + '/user/' + userId, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return JSON.stringify(data);


        })
        .catch((err) => Alert.alert("problem connecting to the server: " + err))
    console.warn("testtt");

}

const getUserById = async (id) => {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'localtonet-skip-warning': true
        },
    }
    return await fetch(env.BACKEND_SERVER_URL + '/user/' + id, options)
}


export { getUser, getUserById };
