import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeNavigator from "./HomeNavigator";
import CetaceansNavigator from "./CetaceansNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MapNavigator from "./MapNavigator";

import defaultStyles from "../config/styles";

const Tab = createBottomTabNavigator();

const tabBar = [
  {
    route: "Home",
    label: "Início",
    icon: "home-outline",
    iconFocused: "home",
    component: HomeNavigator,
  },
  {
    route: "Cetaceans",
    label: "Espécies",
    icon: "format-list-bulleted",
    iconFocused: "format-list-bulleted",
    component: CetaceansNavigator,
  },
  {
    route: "Map",
    label: "Mapa",
    icon: "map-outline",
    iconFocused: "map",
    component: MapNavigator,
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
    shifting
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "400",
      },
      tabBarStyle: {
        position: "absolute",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.white,
      },
      tabBarActiveTintColor: defaultStyles.colors.primary,
    }}
  >
    {tabBar.map((nav, index) => {
      return (
        <Tab.Screen
          key={index}
          name={nav.route}
          component={nav.component}
          options={{
            tabBarShowLabel: false,
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
