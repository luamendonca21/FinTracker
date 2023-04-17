import React, { useEffect, useCallback, useState } from "react";
import { StatusBar } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { OfflineNotice } from "./app/components/Alerts";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import info from "./app/info/cetaceans";
import cetaceansApi from "./app/api/cetaceans";
import useApi from "./app/hooks/useApi";
import movebankApi from "./app/api/movebankApi";

import myTheme from "./app/navigation/navigationTheme";
import defaultStyles from "./app/config/styles";

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
  // ------ STATE MANAGEMENT -------------
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  // ------ APIS ------
  const [storeCetaceanApi, errorStoreCetacean] = useApi(
    cetaceansApi.storeCetacean
  );
  const [deleteAllCetaceansApi, errorDeleteAllCetaceans] = useApi(
    cetaceansApi.deleteAllCetaceans
  );
  /* const [storeEventApi, errorStoreEvent] = useApi(eventsApi.storeEvent);
  const [deleteAllEventsApi, errorDeleteAllEvents] = useApi(
    eventsApi.deleteAllEvents
  ); */

  // ------ UTILITIES --------
  const isInternetNotConnected = () => {
    return netInfo.type !== "unknown" && netInfo.isInternetReachable === false;
  };

  const fetchAndStoreCetaceans = async () => {
    try {
      // delete from backend
      await deleteAllCetaceansApi()
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      // get the cetaceans from movebank
      const individuals = await movebankApi.getIndividualsByStudy(886013997);

      // store the cetaceans in backend
      await Promise.all(
        individuals.map(async (value, index) => {
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
          await storeCetaceanApi(cetacean)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        })
      );
    } catch (error) {
      console.warn(error);
    }
  };

  /* const fetchAndStoreEvents = async () => {
    try {
      // delete from backend
      await deleteAllEventsApi();

      // get the cetaceans from movebank
      const events = await movebank.getIndividualEvents(886013997);

      // store the cetaceans in backend
      await Promise.all(
        events.map(async (value, index) => {
          const event = {
            ...value,
          };
          await storeEventApi(event);
        })
      );
    } catch (error) {
      console.warn(error);
    }
  }; */

  // ------- LIFECYCLE HOOKS --------

  const netInfo = useNetInfo();

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchAndStoreCetaceans();
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
