import produce from "immer";
import { getToken } from "../../services/auth/asyncStorage";
import { selectNotifications } from './../utils/selectors';

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const FETCHING = "notifications/fetching";
const RESOLVED = "notifications/resolved";
const REJECTED = "notifications/rejected";

const notificationsFetching = () => ({type: FETCHING})
const notificationsResolved = (data) => ({type: RESOLVED, payload: data})
const notificationsFejected = (error) => ({type: REJECTED, payload: error})

export async function fetchOrUpdateNotifications(store) {
    const status = selectNotifications(store.getState()).status
    if (status === 'pending' || status === 'updating') {
        return
    }
    store.dispatch(notificationsFetching())
    try {
        const token = await getToken();
        /* options */
        let options = {
            method: 'GET', 
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

        /* sending request */
        const response = await fetch(env.BACKEND_SERVER_URL + url, options)
        // const response = await fetch('http://localhost:8000/freelances')
        const data = await response.json()
        store.dispatch(notificationsResolved(data))
    } catch (error) {
        store.dispatch(notificationsFejected(error))
    }
}

export default function notifacationReducer(state= initialState, action){
    return produce(state, draft => {
        switch (action.type) {
            case FETCHING: {
                if(draft.status === 'void'){
                    draft.status = "pending";
                    return
                }
                if(draft.status === 'rejected'){
                    draft.error = null;
                    draft.status = "pending";
                    return
                }
                if(draft.status === 'resolved'){
                    draft.status = "updating";
                    return
                }
                return
            }

            case RESOLVED: {
                if(draft.status === "pending" || draft.status === "updating") {
                    draft.data = action.payload
                    draft.status = "resolved"
                    return
                }
                return
            }

            case REJECTED: {
                if(draft.status === "pending" || draft.status === "updating") {
                    draft.error = action.payload
                    draft.data = null
                    draft.status = "rejected"
                    return
                }
                return
            }
            default:
                return
        }
    })
}