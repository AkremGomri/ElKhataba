/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"

const useEffectFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.warn("useEffect: ",options);
        setTimeout(() => {
            fetch(url, options)
                .then(res => {
                    if(!res.ok){
                        throw Error('could not fetch the data for this resource: ' + url);
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    // SpeechSynthesisErrorEvent(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        }, 400);
    }, [url]);

    return { data, isPending, error, setData }
}

export default useEffectFetch;