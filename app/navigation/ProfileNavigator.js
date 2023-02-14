import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AccountScreen from "../screens/AccountScreen";

import defaultStyles from "../config/styles";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="ProfileScreen"
      component={UserProfileScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="CetaceansProfile"
      component={CetaceanProfileScreen}
    />
    <Stack.Screen
      options={{ headerShown: true, headerTitle: "Definições" }}
      name="Settings"
      component={SettingsScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Conta",
        animation: "slide_from_right",
      }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{ headerShown: true, headerTitle: "Sobre" }}
      name="About"
      component={AboutScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Features"
      component={FeatureScreen}
    />
  </Stack.Navigator>
);

export default ProfileNavigator;
