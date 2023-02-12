import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import defaultStyles from "../config/styles";
import UserProfileScreen from "../screens/UserProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import FeatureScreen from "../screens/FeatureScreen";
const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
    }}
  >
    <Stack.Screen name="ProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="CetaceansProfile" component={CetaceanProfileScreen} />
    <Stack.Screen
      options={{ headerShown: true, headerTitle: "Definições" }}
      name="Settings"
      component={SettingsScreen}
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
