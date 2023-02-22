import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppText from "../components/AppText";
import { ListDetails, ListOptions } from "../components/Lists";
import { IconButton } from "../components/Buttons";
import BottomSheet from "../components/BottomSheet";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const notifications = [
  { id: 1, title: "Quando estiver perto da minha localização" },
  { id: 2, title: "Quando estiver perto de um local personalizado" },
];

const CetaceanProfileScreen = ({ route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState([]);

  // ---------- ADD TO FAVORITES -----------

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  const selectFavoriteIcon = () => {
    return isFavorite ? ["favorite", "red"] : ["favorite-outline", "black"];
  };

  // --------- ADD NOTIFICATION ---------------

  const handleNotificationPress = () => {
    setBottomSheetActive(!isBottomSheetActive);
  };

  const selectNotificationIcon = () => {
    return !isBottomSheetActive ? "notifications-none" : "notifications";
  };
  const handleNotificationOptionPress = (id) => {
    if (!notificationsActive.includes(id)) {
      setNotificationsActive([...notificationsActive, id]);
    } else {
      setNotificationsActive(
        notificationsActive.filter((elemento) => elemento !== id)
      );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={item.imageUrl} />
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
              <AppText style={styles.title}>Introdução</AppText>
              <AppText style={styles.text}>{item.introduction}.</AppText>
              <AppText style={styles.title}>História</AppText>
              <AppText style={styles.text}>{item.history}</AppText>
              <AppText style={styles.title}>Rota de migração</AppText>
              <AppText style={styles.text}>{item.migration}</AppText>
            </View>
          </ScrollView>
        </View>
        {isBottomSheetActive ? (
          <>
            <TouchableOpacity
              style={styles.transparentContainer}
              onPress={() => setBottomSheetActive(false)}
            ></TouchableOpacity>
            <BottomSheet
              maxValue={-400}
              minValue={-350}
              initialValue={-400}
              title="Notificações"
            >
              <ListOptions
                options={notifications}
                optionsActive={notificationsActive}
                onPress={(itemId) => handleNotificationOptionPress(itemId)}
              />
            </BottomSheet>
          </>
        ) : (
          ""
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  transparentContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: defaultStyles.colors.transparent,
  },
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
