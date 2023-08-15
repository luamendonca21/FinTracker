import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CetaceansScreen from "../screens/CetaceansScreen";
import CetaceanActivityScreen from "../screens/CetaceanActivityScreen";
import CetaceanProfileScreen from "../screens/CetaceanProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import FeatureScreen from "../screens/FeatureScreen";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="CetaceansScreen"
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: defaultStyles.colors.white },
      headerTintColor: defaultStyles.colors.black,
    }}
  >
    <Stack.Screen name="CetaceansScreen" component={CetaceansScreen} />
    <Stack.Screen name="CetaceansProfile" component={CetaceanProfileScreen} />
    <Stack.Screen
      name="CetaceanActivityScreen"
      component={CetaceanActivityScreen}
    />
    <Stack.Screen name="ProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="Features" component={FeatureScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
