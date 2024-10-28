import React, { useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// components
import Dashboard from "./Dashboard";
import Materials from "./Manage/Materials";
import Tools from "./Manage/Tools";
import Peoples from "./Manage/Peoples";
import Dishes from "./Manage/Dishes";
import Activities from "./Manage/Activities";
import Setting from "./Manage/Setting";
import History from "./Manage/History";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "red",
  },
};

export default function Home(props) {
  const Logoutcom = () => {
    useEffect(() => {
      props.setflag(false);
    }, []);
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="Activities"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "white",
          },
          headerStyle: {
            backgroundColor: "#4287f6",
          },
        }}
      >
        <Drawer.Screen
          name="Order List"
          component={Dashboard}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <Icon name="th-list" size={20} color="#4287F6" />
            ),
          })}
        />

        <Drawer.Screen
          name="Activities"
          component={Activities}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="cookie-plus"
                size={20}
                color="#4287F6"
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Materials"
          component={Materials}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="basket-plus"
                size={20}
                color="#4287F6"
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Tools"
          component={Tools}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <FontAwesome5 name="tools" size={20} color="#4287F6" />
            ),
          })}
        />
        <Drawer.Screen
          name="Peoples"
          component={Peoples}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account-plus"
                size={20}
                color="#4287F6"
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Dishes"
          component={Dishes}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <Icon name="cutlery" size={20} color="#4287F6" />
            ),
          })}
        />
        <Drawer.Screen
          name="Setting"
          component={Setting}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <Icon name="cog" size={20} color="#4287F6" />
            ),
          })}
        />
        <Drawer.Screen
          name="History"
          component={History}
          options={() => ({
            headerTintColor: "#fff",
            drawerIcon: ({ focused }) => (
              <Icon name="history" size={20} color="#4287F6" />
            ),
          })}
        />

        <Drawer.Screen
          name="Logout"
          component={Logoutcom}
          options={({ navigation }) => ({
            headerTintColor: "#fff",
            headerTitleStyle: {
              // fontWeight: "bold",
              // fontSize: 20,
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => props.setflag(false)}>
                  <Text style={{ color: "red" }}>Logout</Text>
                </TouchableOpacity>
              );
            },
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons name="logout" size={20} color="#4287F6" />
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
