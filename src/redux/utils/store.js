// import themeReducer from '../features/theme'
// import freelanceReducer from '../features/freelance'
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notification";
// import socket from "../../services/socket/socket";
// import usersReducer from "../features/users";
// import notifacationReducer from './../features/Notifications';
import SocketIO from "./../features/SocketIO";

export default configureStore({
  reducer: {
    // users: usersReducer,
    // Notification: notifacationReducer, // ya akrem netsawer lenna notification: notifacationReducer ( el n lezm tkoun minuscule ) //made by Akrem himself hihihi
    socketIO: SocketIO,
    notifications: notificationsReducer,
    // theme: themeReducer,
    // freelances: freelancesReducer,
    // freelance: freelanceReducer,
  },
});
