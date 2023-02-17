import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

import defaultStyles from "./app/config/styles";
import myTheme from "./app/navigation/navigationTheme";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={defaultStyles.colors.transparent}
        translucent={true}
      />

      <NavigationContainer theme={myTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
