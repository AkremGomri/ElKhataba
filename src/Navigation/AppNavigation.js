/* eslint-disable prettier/prettier */
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
// import { Button, Icon } from 'react-native-elements'

import { useState, useEffect } from "react";
import useEffectFetch from "../services/useEffectFetch";
import env from "../../env";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card/Card";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SigninScreen from "../screens/auth/SigninScreen/SigninScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFeather from "react-native-vector-icons/Feather";
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import OnConstruction from "../screens/OnConstruction";
import Notification from "../screens/Notification/Notification";
// import { Icon, withBadge } from "@rneui/themed";
// const BadgedIcon = withBadge(15)(Icon);
const { width, height } = Dimensions.get("window");
const Tabs = createBottomTabNavigator();
import { getToken } from "../services/auth/asyncStorage";
import Notifications from "../components/Notifications";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import MatchesScreen from "../screens/Matches/MatchesScreen";
import Chat from "../screens/Chat/Chat";
import Discussion from "../screens/Chat/Discussion";
import { useFetch } from '../services/useFetch';
import { useContext } from 'react';
import { Context } from './../services/context/Context';
import { useDispatch, useSelector } from "react-redux";
import { setIAmConnected } from './../redux/features/SocketIO';
import { selectIAmConnected } from "../redux/utils/selectors";
// import { setNbNotif, addNbNotif } from "../redux/features/notification";

export default AppNavigation = () => {

  const { data: notifs, isLoading, error, setData: setNotifs } = useFetch(`/user/getMyNotifs`);

  // a funtion that takes in input two arguments and sum them up in return using javascript
  function sum(a, b) { }

  function updateNotif(id, field, value) {
    setNotifs(
      data.map((notif) => {
        if (notif._id === id) notif[field] = value;
        return notif;
      })
    );
    console.warn("compeleted");
  }

  const [socket, setSocket] = useContext(Context);
  const dispatch = useDispatch();
  // const nbNotifs = useSelector(state => {
  //   return state.notifications.number})
  const [nbNotifs, setNbNotifs] = useState(0)

  const isConnected = useSelector(state => state.socketIO.isConnected)

  useEffect(() => {
    let x = 0;
    console.log("AppNavigation::notifs: ", notifs);
    notifs.forEach((notif, index) => {
      if (notif.isnew) {
        console.warn("this one is new");
        x++;
      }
    })
    setNbNotifs(x)

    socket.on('connect', () => {
      dispatch(setIAmConnected(true))
    });

    socket.on('disconnect', () => {
      dispatch(setIAmConnected(false))
    });

    socket.on('pong', () => {
      // setLastPong(new Date().toISOString());
    });

    socket.on('newNotification', (newNotif) => {
      setNotifs([newNotif,
        ...notifs
      ])
      console.log('this is totally new: ' + nbNotifs);
      // setNbNotifs(nbNotifs+1)
      console.log('after: ' + nbNotifs);
    })

    socket.on('deleteNotification', (data) => {
      console.log("entreing deleteNotifications " + notifs);
      setNotifs(notifs.map((notif) => {
        console.log("hereeeeeeeeee");
        console.log("akrem");
        if (notif.type !== data.type || notif.senderId !== senderId) {
          return notif
        } else {
          console.log("deleted 1");
          if (notif.isnew) {
            console.log("doing......");
            setNbNotifs(nbNotifs - 1)
          }
        }
      }))
      console.log("notifs are: " + notifs);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('newNotification');
    };
  }, [notifs]);

  // useEffect(() => {
  //   async function fetchNotifs() {
  //     const token = await getToken();
  //     let options = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     };
  //     fetch(env.BACKEND_SERVER_URL + "/getMyNotifs", options).then((res) => {
  //       if (!res.ok) {
  //         Alert.alert("connection problem");
  //         return null;
  //       }
  //       res.json().then((data) => {
  //         if (!data) {
  //           return null;
  //         }
  //         setNotifs(data);
  //         let x = 0;
  //         data.forEach((notif, index) => {
  //           if (notif.isnew) {
  //             x++;
  //           }
  //         });
  //         setNewNotifsNumber(x);
  //       });
  //     });

  //     console.warn("newNotifs number: ", newNotifsNumber);
  //   }
  //   fetchNotifs();
  // }, []);

  const CustomHomeHeader = ({ navigation, route }) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{isConnected ? "you are connected !" : "you are off line"}</Text>
      </View>
    );
  };

  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: "rgba(161, 16, 59, 0.8)",
        activeBackgroundColor: "rgba(0,0,0,0.2)",
      }}
      tabBar={(props) => (
        <View style={{ position: "absolute", left: -8, bottom: 0, right: 0 }}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarStyle: { backgroundColor: "transparent", elevation: 0 },
      }}
    >
      <Tabs.Screen
        name="notifications"
        children={() => (
          <Notification
            update={updateNotif}
            notifs={notifs}
          />
        )}
        options={{
          tabBarBadge: nbNotifs > 0 ? nbNotifs : null,
          tabBarIcon: ({ color, size }) => (
            <IconFeather name="bell" color={color} size={36} />
          ),
        }}
      />

      <Tabs.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IconCommunity name="ring" color={color} size={36} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        backBehavior="firstRoute"
        component={HomeScreen}
        options={{
          // tabBarButton: () => null,
          // tabBarVisible: true,
          header: () => <CustomHomeHeader />,

          tabBarIcon: ({ color, size }) => (
            <IconAntDesign name="home" color={color} size={36} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IconFeather name="message-square" color={color} size={36} />
            // <BadgedIcon type="ionicon" name="ios-chatbubbles" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IconCommunity name="account-circle" color={color} size={36} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
