import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";

import AppText from "../components/AppText";
import { AppButton, AppSecondaryButton } from "../components/Buttons";
import GlowingCircle from "../assets/animations/GlowingCircle";
import Screen from "../components/Screen";
import IndexCarousel from "../components/Carousels/IndexCarousel/IndexCarousel";
import { MaterialIcons } from "@expo/vector-icons";
import { RecommendedItem, CloseItem, RankItem } from "../components/Items";
import { Skeleton } from "../components/Loaders";
import { NoContentCard } from "../components/Alerts";

import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import cetaceansApi from "../api/cetaceans";
import eventsApi from "../api/events";

import routes from "../navigation/routes";
import useLocation from "../hooks/useLocation";
import settings from "../config/settings";

import defaultStyles from "../config/styles";

const baseURL = settings.apiUrl;

const windowWidth = Dimensions.get("window").width;

const shortcuts = [
  {
    id: 0,
    title: "Cetáceos favoritos",
    subTitle: "Visualiza os teus cetáceos favoritos.",
    buttonTitle: "Ir para favoritos",
    target: "Profile",
  },
  {
    id: 1,
    title: "Funcionalidades",
    subTitle: "Descobre o que podes fazer.",
    buttonTitle: "Ir para funcionalidades",
    target: routes.FEATURE,
  },
  {
    id: 2,
    title: "Definições",
    subTitle: "Personaliza as tuas definições.",
    buttonTitle: "Ir para definições",
    target: routes.SETTINGS,
  },
];
const HomeScreen = ({ navigation }) => {
  const { location, errorMsg } = useLocation();
  const scrollRef = useRef();

  // retrieve the user logged
  const { user } = useAuth();

  // ------ STATE MANAGEMENT -------
  const [username, setUsername] = useState("");
  const [isRankIncreasing, setIsRankIncreasing] = useState(true);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [cetaceans, setCetaceans] = useState([]);
  const [recommendedCetaceans, setRecommendedCetaceans] = useState([]);
  const [closeCetaceans, setCloseCetaceans] = useState([]);

  // ------- APIS -------
  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);
  const [getUsersApi, isLoadingUsers, errorGetUsers] = useApi(
    usersApi.getUsers
  );
  const [getAllCetaceansApi, isLoadingAllCetaceans, errorGetAllCetaceans] =
    useApi(cetaceansApi.getAllCetaceans);
  const [getCetaceansByIdApi, isLoadingCetaceans, errorGetCetaceans] = useApi(
    cetaceansApi.getById
  );
  const [getEventsNearApi, isLoadingEventsNear, errorGetEventsNear] = useApi(
    eventsApi.getNear
  );

  // ------- UTILITIES --------

  const handleRankOrderPress = () => {
    setIsRankIncreasing(!isRankIncreasing);
    const sorted = users
      .map((user, index) => ({ ...user, index }))
      .sort((a, b) =>
        isRankIncreasing ? b.points - a.points : a.points - b.points
      );
    setSortedUsers(sorted);
  };

  const orderFavoriteCetaceans = () => {
    const idCounts = {};

    // Conta as ocorrências de cada ID de animal
    users.forEach((user) => {
      user.favorites.forEach((individualId) => {
        if (idCounts[individualId]) {
          idCounts[individualId]++;
        } else {
          idCounts[individualId] = 1;
        }
      });
    });

    // Ordena os IDs por popularidade (contagem de ocorrências)
    const sortedIds = Object.keys(idCounts).sort((a, b) => {
      return idCounts[b] - idCounts[a];
    });

    const getCetaceansByIds = async (ids) => {
      const cetaceans = {};
      await Promise.all(
        ids.map((id) =>
          getCetaceansByIdApi(id).then(
            (response) => (cetaceans[id] = response.cetacean)
          )
        )
      );
      return ids.map((id) => cetaceans[id]);
    };

    getCetaceansByIds(sortedIds).then((recommendedCetaceans) => {
      setRecommendedCetaceans(recommendedCetaceans);
    });
  };

  const handlePressShortcut = ({ target }) => {
    navigation.navigate(target);
  };

  const findCetacean = (individualId) => {
    const item = cetaceans.find(
      (value, index) => value.individualId == individualId
    );
    return item;
  };

  const renderCetacean = ({ item, index }) => {
    return (
      <RecommendedItem
        key={index}
        onPress={() => navigation.navigate("CetaceansProfile", { item })}
        item={item}
      />
    );
  };
  const renderItem = ({ item, index }) => {
    return <RankItem item={item} index={index} />;
  };

  const getAllCetaceans = () => {
    getAllCetaceansApi()
      .then((response) => {
        setCetaceans(response.cetaceans);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    getUserApi(user.id)
      .then((response) => {
        setUsername(response.username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    getUsersApi()
      .then((response) => setUsers(response.users))
      .catch((error) => console.log(error));
  };

  const getEventsNear = () => {
    getEventsNearApi({
      long: location.coords.longitude,
      lat: location.coords.latitude,
    })
      .then((response) => setCloseCetaceans(response.events))
      .catch((error) => console.log(error));
  };

  // ------ LIFECYCLE HOOKS --------
  useEffect(() => {
    getAllCetaceans();
    getUser();
    getUsers();
  }, []);

  useEffect(() => {
    cetaceans.length != 0 && location != null && getEventsNear();
  }, [cetaceans, location]);

  useEffect(() => {
    const sorted = users.sort((a, b) => {
      if (isRankIncreasing) {
        return b.points - a.points;
      } else {
        return a.points - b.points;
      }
    });
    setSortedUsers(sorted);
  }, [users, isRankIncreasing]);

  useEffect(() => {
    users.length != 0 && orderFavoriteCetaceans();
  }, [users]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <View style={styles.container}>
          <Screen>
            <View
              style={{
                marginBottom: 25,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!isLoadingUser ? (
                <AppText style={styles.welcome}>Olá, {username}!</AppText>
              ) : (
                <Skeleton style={styles.welcome} />
              )}
              <GlowingCircle
                onPress={() =>
                  scrollRef.current.scrollToEnd({ animated: true })
                }
              />
            </View>
            <AppText style={{ fontSize: 18 }}>Atalhos</AppText>
            <IndexCarousel items={shortcuts}>
              {shortcuts.map((item, index) => (
                <View key={index} style={styles.shortcutsContent}>
                  <AppText style={styles.shortcutsTitle}>{item.title}</AppText>
                  <AppText style={styles.shortcutsSubtitle}>
                    {item.subTitle}
                  </AppText>
                  <AppButton
                    style={styles.button}
                    color="secondary"
                    title={item.buttonTitle}
                    onPress={() => handlePressShortcut(item)}
                  />
                </View>
              ))}
            </IndexCarousel>
            <AppText style={styles.title}>Perto de ti</AppText>
            {closeCetaceans.length != 0 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.carouselContainer}>
                  {closeCetaceans.map((event, index) => (
                    <CloseItem
                      key={index}
                      event={event}
                      name={findCetacean(event.individualId).details[1].value}
                      url={`${baseURL}\\${
                        findCetacean(event.individualId).picture.src
                      }`}
                    />
                  ))}
                </View>
              </ScrollView>
            ) : closeCetaceans.length == 0 && errorMsg === null ? (
              <Skeleton style={{ height: 170, width: "100%", marginTop: 10 }} />
            ) : closeCetaceans.length == 0 && errorMsg !== null ? (
              <NoContentCard
                style={styles.noContentCard}
                msg="Permita o acesso à localização para saber que cetáceos estão
               próximos de si."
              />
            ) : null}
            <AppText style={styles.title}>Recomendados</AppText>
            {recommendedCetaceans.length != 0 ? (
              <FlatList
                style={styles.recommendedContainer}
                showsVerticalScrollIndicator={true}
                horizontal={false}
                nestedScrollEnabled
                data={recommendedCetaceans}
                keyExtractor={(item) => item._id}
                renderItem={renderCetacean}
              />
            ) : (
              <Skeleton style={styles.recommendedContainer} />
            )}
            <View
              style={{
                marginBottom: 10,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="leaderboard"
                size={42}
                color={defaultStyles.colors.yellow}
              />
              <AppText style={[styles.title, { marginLeft: 5, marginTop: 10 }]}>
                Tabela de liderança
              </AppText>
            </View>
            <AppSecondaryButton
              onPress={handleRankOrderPress}
              icon={{
                name: isRankIncreasing
                  ? "sort-numeric-descending"
                  : "sort-numeric-ascending",
                size: 24,
              }}
              title="Ordenar por"
              style={styles.orderButton}
              styleText={{ fontSize: 15 }}
            />
            {sortedUsers.length != 0 ? (
              <FlatList
                style={styles.rankContainer}
                showsVerticalScrollIndicator={true}
                horizontal={false}
                nestedScrollEnabled
                data={sortedUsers}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
              />
            ) : (
              <Skeleton style={styles.rankContainer} />
            )}
          </Screen>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
  },
  welcome: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  title: { fontSize: 18, marginTop: 15, fontWeight: "bold" },
  shortcutsContent: {
    padding: 20,
    width: windowWidth * 0.92,
    height: "100%",
  },
  shortcutsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
    color: defaultStyles.colors.white,
  },
  shortcutsSubtitle: {
    width: "50%",
    lineHeight: 22,
    paddingVertical: 5,
    color: defaultStyles.colors.white,
  },
  button: {
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  index: {
    flex: 1,
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 1,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
  },

  orderButton: {
    width: 160,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  rankContainer: {
    height: 400,
    flex: 1,
    width: "100%",
  },
  recommendedContainer: {
    marginTop: 10,
    width: "100%",
    height: 400,
  },
  activityIndicator: {
    height: 400,
    width: "100%",
    position: "relative",
  },
  noContentCard: { height: 170, marginTop: 10 },
});

export default HomeScreen;
