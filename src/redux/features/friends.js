import { createAction } from '@reduxjs/toolkit'
 
export const setUserConnected = createAction(
    'UserConnected/set',
    (id, data) => ({
        payload: {id, data},
    })
);

export const setSocketIO = createAction(
    'socketIO/set',
    data => ({
        payload: data,
    })
)

export default function reducer(state = [], action) {
    if (action.type === setUserConnected.toString()) {
        // var 
        return {
            ...state,
            isConnected: action.payload
        }
    }

    if (action.type === setSocketIO.toString()) {
        return {
            ...state,
            socket: action.payload
        }
    }

    return state
}
// dispatch(toggleHeart())