import React, { useEffect, useCallback, useState } from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { OfflineNotice } from "./app/components/Alerts";
import defaultStyles from "./app/config/styles";
import myTheme from "./app/navigation/navigationTheme";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { useNetInfo } from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  const ignoreWarns = [
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

export default function App() {
  const netInfo = useNetInfo();

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const isInternetNotConnected = () => {
    return netInfo.type !== "unknown" && netInfo.isInternetReachable === false;
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

  return (
    <>
      <StatusBar
        backgroundColor={defaultStyles.colors.transparent}
        translucent={true}
      />
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice
          icon={{ disconnected: "wifi-off", connected: "wifi" }}
          isVisible={isInternetNotConnected()}
          msg={
            isInternetNotConnected()
              ? "Sem conexão à Internet"
              : "Conexão à Internet restaurada"
          }
        />
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
