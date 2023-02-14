import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import CetaceansNavigator from "./CetaceansNavigator";
import ProfileNavigator from "./ProfileNavigator";

import defaultStyles from "../config/styles";

const Tab = createMaterialBottomTabNavigator();

const tabBar = [
  {
    route: "Home",
    label: "Início",
    icon: "home-outline",
    iconFocused: "home",
    component: HomeNavigator,
  },
  {
    route: "Species",
    label: "Espécies",
    icon: "format-list-bulleted",
    iconFocused: "format-list-bulleted",

    component: CetaceansNavigator,
  },
  {
    route: "Profile",
    label: "Perfil",
    icon: "account-outline",
    iconFocused: "account",
    component: ProfileNavigator,
  },
];
const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor={defaultStyles.colors.secondary}
    inactiveColor={defaultStyles.colors.black}
    labelStyle={{ fontSize: 14, fontWeight: "400" }}
    barStyle={{
      position: "absolute",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      paddingHorizontal: 20,
      justifyContent: "center",
      borderColor: defaultStyles.colors.white,
      backgroundColor: defaultStyles.colors.white,
      borderColor: defaultStyles.colors.light,
      borderWidth: 1,
    }}
    screenOptions={{
      headerShown: false,
    }}
  >
    {tabBar.map((nav, index) => {
      return (
        <Tab.Screen
          key={index}
          name={nav.route}
          component={nav.component}
          options={{
            tabBarLabel: nav.label,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? nav.iconFocused : nav.icon}
                size={32}
                color={color}
              />
            ),
          }}
        ></Tab.Screen>
      );
    })}
  </Tab.Navigator>
);

export default AppNavigator;
