import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CetaceansScreen from "../screens/CetaceansScreen";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import defaultStyles from "../config/styles";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
    }}
  >
    <Stack.Screen name="Cetaceans" component={CetaceansScreen} />
    <Stack.Screen name="CetaceansProfile" component={CetaceanProfileScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
