import { createAction } from '@reduxjs/toolkit'
 
const toggleHeart = createAction(
    'heart/toggle',
    (userId) => ({
        payload: { userId },
    })
);

const setHeart = createAction(
    'heart/set',
    (userId, data) => ({
        payload: { userId, data },
    })
);

export default function reducer(state = null, action) {
    if (action.type === toggleHeart.toString()) {
        state.map(user => {
            if(user.id === action.payload){
                // user.
            }
        })
        return state === true ? false : true
    }
    if (action.type === setHeart.toString()) {
        return action.payload
    }
    return state
}
// dispatch(toggleHeart())
