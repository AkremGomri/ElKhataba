/* eslint-disable prettier/prettier */
import { useState } from 'react';

const useFetch = (url, options) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    setTimeout(() => {
        fetch(url, options)
            .then((res)=> {
                if(!res.ok){
                    setError('could not fetch the data for this resource: ' + url)
                    throw Error (error);
                } 
                return res.json()
            })
            .then( data => {
                setData(data);
                setIsPending(false);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    },400);
    return { data, isPending, error};
}

export default useFetch;