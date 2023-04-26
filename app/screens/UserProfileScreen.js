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
import { Skeleton } from "../components/Loaders";

import useAuth from "../auth/useAuth";
import usersApi from "../api/user";
import cetaceansApi from "../api/cetaceans";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const PICTURE_SIZE = 250;
function UserProfileScreen({ navigation }) {
  // available details for user
  const details = [
    { id: 1, title: "Idade" },
    { id: 2, title: "País" },
    { id: 3, title: "Profissão" },
  ];

  //retrieve the user logged
  const { user } = useAuth();

  // ----- STATE MANAGEMENT ------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("");
  const [detailsActive, setDetailsActive] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ------ APIS ------
  const [updateUserDetailsApi, isLoadingDetailsUpdate, errorUpdateDetails] =
    useApi(usersApi.updateDetails);
  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);
  const [getUserDetailsApi, isLoadingDetails, errorGetDetails] = useApi(
    usersApi.getDetails
  );
  const [getCetaceansById, isLoadingCetaceans, errorGetCetaceans] = useApi(
    cetaceansApi.getById
  );

  // --------- UTILITIES -----------
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

    // only unmount the bottom sheet when the fade out animation finish
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  const handleApplyChanges = () => {
    setDetailsActive(inputs);
    setIsAnimating(false);

    // only unmount the bottom sheet when the fade out animation finish
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  const updateUserDetails = () => {
    updateUserDetailsApi(user.id, detailsActive)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    getUserApi(user.id)
      .then((response) => {
        setPoints(response.points);
        setUsername(response.username);
        setFavoritesIds(response.favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserDetails = () => {
    getUserDetailsApi(user.id)
      .then((response) => {
        setDetailsActive(response.details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ------- LIFECYCLE HOOKS --------
  useEffect(() => {
    updateUserDetails();
  }, [detailsActive]);

  useEffect(() => {
    getUser();
    getUserDetails();
  }, []);

  useEffect(() => {
    favoritesIds.forEach((value) => {
      getCetaceansById(value)
        .then((response) => {
          const newFavorite = response.cetacean;
          console.log(response.cetacean);
          setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [favoritesIds]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              <ProfileImage
                deleteIcon
                addIcon
                size={{ width: PICTURE_SIZE, height: PICTURE_SIZE }}
              />
            </View>
            <View style={styles.profileContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                  {!isLoadingUser ? (
                    <AppText style={styles.userName}>{username}</AppText>
                  ) : (
                    <Skeleton style={styles.userName} />
                  )}
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
                  {isLoadingDetails ? (
                    <Skeleton style={{ width: "100%", height: 80 }} />
                  ) : detailsActive.length !== 0 ? (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <ListDetails details={detailsActive} />
                    </ScrollView>
                  ) : null}

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
              <Fade duration={500} value={0.4} isVisible={isAnimating} />
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
});

export default UserProfileScreen;
