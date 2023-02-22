import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../screens/MapScreen";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";

import defaultStyles from "../config/styles";

const Stack = createNativeStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="Map"
      component={MapScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="CetaceanProfile"
      component={CetaceanProfileScreen}
    />
  </Stack.Navigator>
);

export default MapNavigator;