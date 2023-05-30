import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";
import PasswordScreen from "../screens/PasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import UsernameScreen from "../screens/UsernameScreen";
import MapScreen from "../screens/MapScreen";
import defaultStyles from "../config/styles";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import ContactsScreen from "../screens/ContactsScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
    }}
  >
    <Stack.Screen
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="Features"
      component={FeatureScreen}
    />
    <Stack.Screen
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="Contacts"
      component={ContactsScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: "Definições",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="Settings"
      component={SettingsScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: "Sobre Nós",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="About"
      component={AboutScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: "Conta",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

        headerTitle: "Palavra-passe",
      }}
      name="Password"
      component={PasswordScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

        headerTitle: "Eliminar conta",
      }}
      name="DeleteAccount"
      component={DeleteAccountScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

        headerTitle: "Nome de utilizador",
      }}
      name="Username"
      component={UsernameScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="CetaceansProfile"
      component={CetaceanProfileScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="MapScreen"
      component={MapScreen}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
