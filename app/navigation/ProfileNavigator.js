import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import defaultStyles from "../config/styles";
import UserProfileScreen from "../screens/UserProfileScreen";
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
  </Stack.Navigator>
);

export default ProfileNavigator;
