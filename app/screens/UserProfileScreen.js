import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppText from "../components/AppText";
import { ListDetails, ListItemSeparator } from "../components/Lists";
import PointsIndicator from "../components/PointsIndicator";
import { Carousel } from "../components/Carousels/ImageCarousel";
import { IconButton } from "../components/Buttons";
import Screen from "../components/Screen";
import Icon from "../components/Icon";
import BottomSheet from "../components/BottomSheet";
import DropDownSelector from "../components/DropDownSelector";
import Fade from "../assets/animations/Fade";
import ProfileImage from "../components/ProfileImage";
import ActivityIndicator from "../components/ActivityIndicator";

import useAuth from "../auth/useAuth";
import usersApi from "../api/user";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

function UserProfileScreen({ navigation }) {
  const details = [
    { id: 1, title: "Idade" },
    { id: 2, title: "País" },
    { id: 3, title: "Profissão" },
  ];
  const { user } = useAuth();

  const favorites = [
    {
      id: 1,
      name: "Atlantic spotted Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Stenella frontalis",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
  ];

  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("");
  const [detailsActive, setDetailsActive] = useState([]);

  const [updateUserDetailsApi, isLoadingDetailsUpdate, errorUpdateDetails] =
    useApi(usersApi.updateDetails);
  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);
  const [getUserDetailsApi, isLoadingDetails, errorGetDetails] = useApi(
    usersApi.getDetails
  );

  useEffect(() => {
    updateUserDetailsApi(user.id, detailsActive)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [detailsActive]);

  useEffect(() => {
    getUserApi(user.id)
      .then((response) => {
        console.log(response);
        setPoints(response.points);
        setUsername(response.username);
      })
      .catch((error) => {
        console.log(error);
      });
    getUserDetailsApi(user.id)
      .then((response) => {
        console.log(response);
        setDetailsActive(response.details);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // --------- PROFILE DETAILS -----------

  const handleEditDetailsPress = () => {
    setBottomSheetActive(!isBottomSheetActive);
    setIsAnimating(true);
  };

  const isDetailActive = (id) => {
    return inputs.find((item) => item.id === id);
  };

  const handleDetailItemPress = (id, title) => {
    let newDetail = { id: id, title: title };
    if (!isDetailActive(id)) {
      setInputs([...inputs, newDetail]);
    } else {
      setInputs(inputs.filter((elemento) => elemento.id !== id));
    }
  };

  const handleOnChangeDetail = (text, id) => {
    let object = isDetailActive(id);
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
    }, 460);
  };
  const handleApplyChanges = () => {
    setDetailsActive(inputs);
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActivityIndicator
          visible={isLoadingDetails || isLoadingDetailsUpdate || isLoadingUser}
        />
        <View style={styles.container}>
          <Screen>
            <View style={styles.imageContainer}>
              <Icon
                onPress={() => navigation.navigate(routes.SETTINGS)}
                style={styles.icon}
                icon="cog-outline"
                size={26}
                iconColor={defaultStyles.colors.black}
                backgroundColor={defaultStyles.colors.white}
              />
              <ProfileImage />
            </View>
            <View style={styles.profileContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                  <AppText style={styles.userName}>{username}</AppText>
                  <PointsIndicator points={points} />
                </View>
                <View style={styles.body}>
                  <View style={styles.detailsHeader}>
                    <AppText style={styles.title}>Detalhes</AppText>
                    <IconButton
                      style={styles.iconButton}
                      onPress={handleEditDetailsPress}
                      color={defaultStyles.colors.black}
                      name="edit"
                      size={25}
                    />
                  </View>
                  {detailsActive.length !== 0 && (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <ListDetails details={detailsActive} />
                    </ScrollView>
                  )}
                  <ListItemSeparator
                    width="100%"
                    style={{ marginVertical: 20 }}
                  />
                  <AppText style={styles.title}>Cetáceos Favoritos</AppText>
                  <Carousel style={{ marginBottom: 15 }} data={favorites} />
                  <AppText style={styles.title}>Visitados</AppText>
                </View>
              </ScrollView>
            </View>
          </Screen>
          {isBottomSheetActive && (
            <>
              <Fade isVisible={isAnimating} />
              <BottomSheet
                closeBottomSheet={handleCloseBottomSheet}
                onPress={handleApplyChanges}
                scroll
                maxValue={-windowHeight / 1.5}
                minValue={-windowHeight / 1.6}
                initialValue={-windowHeight / 1.5}
                title="Editar detalhes"
              >
                {details.map((item, index) => (
                  <DropDownSelector
                    key={index}
                    handleOnChange={(text) =>
                      handleOnChangeDetail(text, item.id)
                    }
                    id={item.id}
                    title={item.title}
                    itemsActive={inputs}
                    onPress={() => handleDetailItemPress(item.id, item.title)}
                  />
                ))}
              </BottomSheet>
            </>
          )}
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: defaultStyles.colors.primary },
  transparentContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: defaultStyles.colors.transparent,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: windowHeight / 3,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: defaultStyles.colors.primary,
  },

  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  profileContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: windowHeight / 3.5,
    padding: 15,
  },
  userName: { fontSize: 22, flex: 1, fontWeight: "bold", marginBottom: 15 },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  body: {
    marginTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconButton: {
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default UserProfileScreen;
