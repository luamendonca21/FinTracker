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
import info from "./app/info/cetaceans";
import cetaceansApi from "./app/api/cetaceans";
import useApi from "./app/hooks/useApi";
import { useNetInfo } from "@react-native-community/netinfo";
import movebankApi from "./app/api/movebankApi";
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

  const [storeCetaceanApi, error] = useApi(cetaceansApi.storeCetacean);
  const [deleteAllCetaceansApi, errorDeleteAllCetaceans] = useApi(
    cetaceansApi.deleteAllCetaceans
  );

  const isInternetNotConnected = () => {
    return netInfo.type !== "unknown" && netInfo.isInternetReachable === false;
  };
  useEffect(() => {
    async function fetchData() {
      try {
        // delete from backend
        deleteAllCetaceansApi()
          .then((response) => console.log(response))
          .catch((error) => console.log(error));

        // get the cetaceans from movebank
        const individuals = await movebankApi.getIndividualsByStudy(886013997);

        // store the cetaceans in backend
        individuals.forEach((value, index) => {
          const {
            details,
            introduction,
            socialBehavior,
            physic,
            history,
            migration,
            name,
          } = info.find(
            (animal) => animal.details[1].value === value.taxon_canonical_name
          );
          const cetacean = {
            ...value,
            details,
            socialBehavior,
            physic,
            name,
            introduction,
            history,
            migration,
          };
          storeCetaceanApi(cetacean)
            .then()
            .catch((error) => console.log(error));
        });
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
    fetchData();
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
