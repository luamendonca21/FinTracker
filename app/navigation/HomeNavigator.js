import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AboutScreen from "../screens/AboutScreen";
import defaultStyles from "../config/styles";
import AccountScreen from "../screens/AccountScreen";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        headerStyle: { height: 40 },
        backgroundColor: defaultStyles.colors.primary,
      },
      headerTintColor: defaultStyles.colors.white,
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
  </Stack.Navigator>
);

export default HomeNavigator;
