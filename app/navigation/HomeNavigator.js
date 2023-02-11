import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FeatureScreen from "../screens/FeatureScreen";
import AboutScreen from "../screens/AboutScreen";
import defaultStyles from "../config/styles";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Features" component={FeatureScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
