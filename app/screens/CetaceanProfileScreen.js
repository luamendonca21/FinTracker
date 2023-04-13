import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fade from "../assets/animations/Fade";
import AppText from "../components/AppText";
import { ListDetails, ListOptions } from "../components/Lists";
import { IconButton } from "../components/Buttons";
import BottomSheet from "../components/BottomSheet";

import cache from "../utility/cache";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import useAuth from "../auth/useAuth";
import settings from "../config/settings";

import defaultStyles from "../config/styles";
import ActivityIndicator from "../components/ActivityIndicator";

const windowHeight = Dimensions.get("window").height;

// available notifications for user
const notifications = [
  { id: 1, title: "Quando estiver perto da minha localização" },
  { id: 2, title: "Quando estiver perto de um local personalizado" },
];

const CetaceanProfileScreen = ({ route }) => {
  const baseURL = settings.apiUrl;
  const { user } = useAuth();

  // ------ STATE MANAGEMENT -------
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [notificationsActive, setNotificationsActive] = useState([]);

  // ---------- APIS -----------
  const [updateFavoriteApi, isLoadingUpdateFavorites, errorUpdate] = useApi(
    usersApi.updateFavorite
  );
  const [deleteFavoriteApi, isLoadingDeleteFavorites, errorDelete] = useApi(
    usersApi.deleteFavorite
  );
  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);

  // ---------- UTILITIES -----------
  const isNotificationActive = (id) => {
    return inputs.find((item) => item.id === id);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    console.log(item.individualId);
    if (!isFavorite) {
      updateFavoriteApi(user.id, item.individualId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } else {
      deleteFavoriteApi(user.id, item.individualId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  const selectFavoriteIcon = () => {
    return isFavorite
      ? ["favorite", "red"]
      : ["favorite-outline", defaultStyles.colors.black];
  };

  const handleNotificationPress = () => {
    setBottomSheetActive(!isBottomSheetActive);
    setIsAnimating(true);
  };

  const selectNotificationIcon = () => {
    return !isBottomSheetActive ? "notifications-none" : "notifications";
  };

  const handleNotificationOptionPress = (id, title) => {
    let newNotification = { id: id, title: title };
    if (!isNotificationActive(id)) {
      setInputs([...inputs, newNotification]);
    } else {
      setInputs(inputs.filter((elemento) => elemento.id !== id));
    }
  };

  const handleOnChangeNotification = (text, id) => {
    let object = isNotificationActive(id);
    const index = inputs.indexOf(object);
    const newObject = { ...object, value: text };
    setInputs([
      ...inputs.slice(0, index),
      newObject,
      ...inputs.slice(index + 1),
    ]);
  };

  const handleCloseBottomSheet = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 440);
  };

  const handleApplyChanges = () => {
    setNotificationsActive(inputs);
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  useEffect(() => {
    const storeNotifications = async () => {
      try {
        await cache.store(`notifications${item.name}`, notificationsActive);
      } catch (error) {
        console.log(error);
      }
    };

    inputs.length != 0 && storeNotifications();
  }, [notificationsActive]);

  useEffect(() => {
    getUserApi(user.id)
      .then((response) => {
        if (response.favorites.includes(item.individualId)) {
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const getNotifications = async () => {
      try {
        const notifications = await cache.get(`notifications${item.name}`);
        setNotificationsActive(notifications);
        console.log(notifications);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `${baseURL}\\${item.picture.src}` }}
          />
        </View>
        <View style={styles.profileContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileContent}>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <AppText numberOfLines={3} style={styles.cetaceanName}>
                    {item.name}
                  </AppText>
                </View>
                <View style={styles.headerIcons}>
                  <IconButton
                    onPress={handleFavoritePress}
                    name={selectFavoriteIcon()[0]}
                    color={selectFavoriteIcon()[1]}
                    size={32}
                  />
                  <IconButton
                    onPress={handleNotificationPress}
                    name={selectNotificationIcon()}
                    color={defaultStyles.colors.black}
                    size={32}
                  />
                </View>
              </View>
              <AppText style={styles.title}>Detalhes</AppText>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <ListDetails details={item.details} />
              </ScrollView>
              <AppText style={styles.text}>{item.individualId}</AppText>
              <AppText style={styles.title}>Introdução</AppText>
              <AppText style={styles.text}>{item.introduction}</AppText>
              <AppText style={styles.title}>Comportamento social</AppText>
              <AppText style={styles.text}>{item.socialBehavior}</AppText>
              <AppText style={styles.title}>Caraterísticas físicas</AppText>
              <AppText style={styles.text}>{item.physic}</AppText>
              <AppText style={styles.title}>História</AppText>
              <AppText style={styles.text}>{item.history}</AppText>
              <AppText style={styles.title}>Rota de migração</AppText>
              <AppText style={styles.text}>{item.migration}</AppText>
            </View>
          </ScrollView>
        </View>
        {isBottomSheetActive && (
          <>
            <Fade duration={500} value={0.4} isVisible={isAnimating} />
            <BottomSheet
              closeBottomSheet={handleCloseBottomSheet}
              onPress={handleApplyChanges}
              maxValue={-400}
              minValue={-350}
              initialValue={-400}
              title="Notificações"
            >
              <ListOptions
                options={notifications}
                optionsActive={inputs}
                onPress={(itemId, itemTitle) =>
                  handleNotificationOptionPress(itemId, itemTitle)
                }
                handleDropDownPressed={(itemId, itemTitle) =>
                  handleNotificationOptionPress(itemId, itemTitle)
                }
                handleOnChange={(text, id) =>
                  handleOnChangeNotification(text, id)
                }
              />
            </BottomSheet>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: windowHeight / 3,
    position: "absolute",
    top: 0,
    backgroundColor: defaultStyles.colors.primary,
    left: 0,
    right: 0,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  profileContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: windowHeight / 3.5,
    padding: 15,
  },
  profileContent: { marginBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerIcons: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
  },
  cetaceanName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    lineHeight: 22,
    textAlign: "justify",
  },

  optionInactive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  optionActive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});

export default CetaceanProfileScreen;
