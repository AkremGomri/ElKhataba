import { createAction } from '@reduxjs/toolkit'
 
export const setIAmConnected = createAction(
    'IAmConnected/set',
    (bool) => ({
        payload: bool,
    })
);

export const setSocketIO = createAction(
    'socketIO/set',
    data => ({
        payload: data,
    })
)

export default function reducer(state = false, action) {
    if (action.type === setIAmConnected.toString()) {
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