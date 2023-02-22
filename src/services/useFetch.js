/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import env from '../../env';
import { getToken } from './auth/asyncStorage';

export const useFetch = (url, method='GET', requestData = null) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return
        setIsPending(true)
        async function fetchData() {
        try {
            const token = await getToken();
            /* options */
            let options = {
                method: method, 
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              };
            if(requestData != null){
                options = { ...options, body: JSON.stringify(requestData)}
            }

            /* sending request */
            const response = await fetch(env.BACKEND_SERVER_URL + url, options)
            const data = await response.json()
            setData(data)
            console.log("daattta ",data);
        } catch (err) {
            console.log(err)
            setError(true)
        } finally {
            setIsPending(false)
        }
        }
        fetchData()
    }, [url])
    return { isPending, data, error, setData }
}

export default useFetch;