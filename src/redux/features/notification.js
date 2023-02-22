import { createAction } from '@reduxjs/toolkit'
import { produce } from 'immer';

export const addNbNotif = createAction(
    'nbre_notification/add',
    (nbre) => ({
        payload: nbre,
    })
);

export const setNbNotif = createAction(
    'nbre_notification/set',
    (nbre) => ({
        payload: nbre,
    })
);

export const addNotif = createAction(
    'notif/add',
    (newNotif) => ({
        payload: newNotif,
    })
);

export const deleteNotif = createAction(
    'notif/delete',
    (notif) => ({
        payload: notif,
    })
);

export default function notificationsReducer(state = {}, action) {
    produce(state, draft => {
        switch(action.type) {
            case addNbNotif.toString():
                if(action.payload >= 0){
                    draft.number += action.payload
                }
                break;

            case setNbNotif.toString():
                if(action.payload >= 0){
                    draft.number = action.payload
                }  
                break;         
            
            case addNotif.toString():
                draft.notifs.push(action.payload)
                break;
            case deleteNotif.toString():
                draft.notifs.pop()
                break;
        }
    })

    // if(action.type === addNotif.toString()) {
    //     return {
    //         ...state,

    //     }
    // }

    // if (action.type === addNbNotif.toString()) {
    //     state.map(nbre_notifs => {
    //         const sum = nbre_notifs + action.payload;
    //         if(sum >=0){
    //             return {
    //                 ...state,
    //                 number: sum
    //             }
    //         }
    //     })
    // }

    // if (action.type === setNbNotif.toString()) {        
    //     if(action.payload >= 0){           
    //         return {
    //             ...state,
    //             number: action.payload
    //         }
    //     }
    // }


    return state
}
// dispatch(toggleHeart())