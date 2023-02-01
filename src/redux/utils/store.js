

// import themeReducer from '../features/theme'
// import freelanceReducer from '../features/freelance'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users'
import notifacationReducer from './../features/Notifications';
 
export default configureStore({
    reducer: {
        users: usersReducer,
        Notification: notifacationReducer
        // theme: themeReducer,
        // freelances: freelancesReducer,
        // freelance: freelanceReducer,
    },
})