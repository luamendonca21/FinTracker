import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";
import PasswordScreen from "../screens/PasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import UsernameScreen from "../screens/UsernameScreen";
import defaultStyles from "../config/styles";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Features"
      component={FeatureScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Definições" }}
      name="Settings"
      component={SettingsScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Sobre" }}
      name="About"
      component={AboutScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Conta" }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Palavra-passe",
        animation: "slide_from_right",
      }}
      name="Password"
      component={PasswordScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Eliminar conta",
        animation: "slide_from_right",
      }}
      name="DeleteAccount"
      component={DeleteAccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Nome de utilizador",
        animation: "slide_from_right",
      }}
      name="Username"
      component={UsernameScreen}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
