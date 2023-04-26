import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import AppText from "../components/AppText";
import { AppButton, AppSecondaryButton } from "../components/Buttons";
import GlowingCircle from "../assets/animations/GlowingCircle";
import Screen from "../components/Screen";
import IndexCarousel from "../components/Carousels/IndexCarousel/IndexCarousel";
import defaultStyles from "../config/styles";
import ActivityIndicator from "../components/Loaders/ActivityIndicator";
import { MaterialIcons } from "@expo/vector-icons";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import cetaceansApi from "../api/cetaceans";
import eventsApi from "../api/events";

import routes from "../navigation/routes";
import { RankItem } from "../components/Items";
import { RecommendedItem } from "../components/Items";
import { Skeleton } from "../components/Loaders";
import settings from "../config/settings";
import useLocation from "../hooks/useLocation";

const windowWidth = Dimensions.get("window").width;
const baseURL = settings.apiUrl;

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
  const [isLoading, setIsLoading] = useState(true);
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

  const metersToKilometers = (meter) => {
    return meter / 1000;
  };
  const findCetacean = (individualId) => {
    const item = cetaceans.find(
      (value, index) => value.individualId == individualId
    );
    return item;
  };

  const getTimeDifference = (dateTime) => {
    const currentDate = new Date();
    const dateToCompare = new Date(dateTime);
    const isFuture = dateToCompare.getTime() > currentDate.getTime();
    console.log("Event date: ", dateToCompare, ", Futuro: ", isFuture);

    const diff = isFuture
      ? dateToCompare.getTime() - currentDate.getTime()
      : currentDate.getTime() - dateToCompare.getTime();
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    const timeDirection = isFuture ? "Daqui a" : "Há";

    if (diffInWeeks > 0) {
      if (diffInWeeks === 1) {
        return `${timeDirection} 1 semana`;
      } else {
        return `${timeDirection} ${diffInWeeks} semanas`;
      }
    } else if (diffInDays > 0) {
      if (diffInDays === 1) {
        return `${timeDirection} 1 dia`;
      } else {
        const remainingHours = diffInHours % 24;
        if (remainingHours === 0) {
          return `${timeDirection} ${diffInDays} dias`;
        } else {
          const remainingMinutes = diffInMinutes % 60;
          if (remainingMinutes === 0) {
            return `${timeDirection} ${diffInDays} dias e ${remainingHours} horas`;
          } else {
            return `${timeDirection} ${diffInDays} dias, ${remainingHours} horas e ${remainingMinutes} minutos`;
          }
        }
      }
    } else if (diffInHours > 0) {
      if (diffInHours === 1) {
        return `${timeDirection} 1 hora`;
      } else {
        const remainingMinutes = diffInMinutes % 60;
        if (remainingMinutes === 0) {
          return `${timeDirection} ${diffInHours} horas`;
        } else {
          return `${timeDirection} ${diffInHours} horas e ${remainingMinutes} minutos`;
        }
      }
    } else {
      return `${timeDirection} alguns minutos`;
    }
  };
  const renderCetacean = ({ item, index }) => {
    return (
      <RecommendedItem
        onPress={() => navigation.navigate("CetaceansProfile", { item })}
        item={item}
        index={index}
      />
    );
  };
  const renderItem = ({ item, index }) => {
    return <RankItem item={item} index={index} />;
  };

  // ------ LIFECYCLE HOOKS --------
  useEffect(() => {
    getAllCetaceansApi()
      .then((response) => {
        console.log(response);
        setCetaceans(response.cetaceans);
      })
      .catch((error) => {
        console.log(error);
      });
    getUserApi(user.id)
      .then((response) => {
        setUsername(response.username);
      })
      .catch((error) => {
        console.log(error);
      });
    getUsersApi()
      .then((response) => setUsers(response.users))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    cetaceans.length != 0 &&
      location != null &&
      getEventsNearApi({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      })
        .then((response) => setCloseCetaceans(response.events))
        .catch((error) => console.log(error));
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
                    <View key={index} style={styles.carouselItem}>
                      <View style={styles.carouselContent}>
                        <View style={styles.headerContainer}>
                          <View style={styles.imageContainer}>
                            <Image
                              style={styles.carouselImage}
                              source={{
                                uri: `${baseURL}\\${
                                  findCetacean(event.individualId).picture.src
                                }`,
                              }}
                              onLoadEnd={() => setIsLoading(false)}
                            />
                            {/*                           <ActivityIndicator visible={isLoading} />
                             */}
                          </View>
                          <View style={styles.details}>
                            <View style={styles.distance}>
                              <AppText style={styles.distanceText}>
                                {metersToKilometers(
                                  event.dist.calculated
                                ).toFixed(2)}{" "}
                                km
                              </AppText>
                            </View>
                            <AppText>
                              {getTimeDifference(event.timestamp)}
                            </AppText>
                          </View>
                        </View>
                        <AppText
                          style={{ fontWeight: "700" }}
                          numberOfLines={1}
                        >
                          {findCetacean(event.individualId).details[1].value}
                        </AppText>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : closeCetaceans.length == 0 && errorMsg === null ? (
              <Skeleton style={{ height: 170, width: "100%", marginTop: 10 }} />
            ) : closeCetaceans.length == 0 && errorMsg !== null ? (
              <View
                style={{
                  height: 170,
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: defaultStyles.colors.white,
                  borderRadius: 15,
                  elevation: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <AppText
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Permita o acesso à localização para saber que cetáceos estão
                  próximos de si.
                </AppText>
              </View>
            ) : null}
            <AppText style={styles.title}>Recomendados</AppText>
            {recommendedCetaceans.length != 0 ? (
              <FlatList
                style={styles.recommendedContainer}
                showsVerticalScrollIndicator={true}
                horizontal={false}
                nestedScrollEnabled
                data={recommendedCetaceans}
                keyExtractor={(item) => item.individualId}
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
  carouselItem: {
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    flex: 1,
    height: 170,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  carouselContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 12,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: { elevation: 2, borderRadius: 15 },
  carouselImage: {
    width: 90,
    borderRadius: 15,
    height: 120,
  },
  details: {
    marginLeft: 10,
    height: 60,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  distance: {
    backgroundColor: defaultStyles.colors.thirdlyLight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 28,
    borderRadius: 50,
  },
  distanceText: {
    color: defaultStyles.colors.thirdly,
    fontWeight: "bold",
    fontSize: 18,
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
});

export default HomeScreen;
