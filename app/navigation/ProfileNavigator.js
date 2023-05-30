import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AccountScreen from "../screens/AccountScreen";

import defaultStyles from "../config/styles";
import PasswordScreen from "../screens/PasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import UsernameScreen from "../screens/UsernameScreen";
import ContactsScreen from "../screens/ContactsScreen";
const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="ProfileScreen"
      component={UserProfileScreen}
    />
    <Stack.Screen
      options={{ headerShown: false, animation: "default" }}
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
      }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Palavra-passe",
      }}
      name="Password"
      component={PasswordScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Eliminar conta",
      }}
      name="DeleteAccount"
      component={DeleteAccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "Nome de utilizador",
      }}
      name="Username"
      component={UsernameScreen}
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
    <Stack.Screen
      options={{ headerShown: true, headerTitle: "Contactos" }}
      name="Contacts"
      component={ContactsScreen}
    />
  </Stack.Navigator>
);

export default ProfileNavigator;
