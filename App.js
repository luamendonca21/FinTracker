import React, { useEffect, useCallback, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

import defaultStyles from "./app/config/styles";
import myTheme from "./app/navigation/navigationTheme";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function restoreUser() {
      try {
        const user = await authStorage.getUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  if (!isReady) {
    return null;
  }
  return (
    <>
      <StatusBar
        backgroundColor={defaultStyles.colors.transparent}
        translucent={true}
      />
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={myTheme}>
          {user ? (
            <AppNavigator onLayout={onLayoutRootView} />
          ) : (
            <AuthNavigator onLayout={onLayoutRootView} />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
