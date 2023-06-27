import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { LinkButton } from "../components/Buttons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fade from "../assets/animations/Fade";
import { AppText } from "../components/Text";
import {
  ListDetails,
  ListOptions,
  ListItemSeparator,
} from "../components/Lists";
import { IconButton, AppSecondaryButton } from "../components/Buttons";
import BottomSheet from "../components/BottomSheet";
import { AppTextInput } from "../components/Inputs";
import { Skeleton } from "../components/Loaders";
import Comment from "../components/Comment";
import { NoContentCard } from "../components/Alerts";
import { Map } from "../components/Map";
import TextSection from "../components/Text/TextSection";
import ToolTip from "../components/ToolTip";

import cetaceansApi from "../api/cetaceans";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import useAuth from "../auth/useAuth";
import settings from "../config/settings";

import routes from "../navigation/routes";
import { toolTipsCetaceanDetails as toolTips } from "../info/data";
import cache from "../utils/cache";
import {
  formatDate,
  findObjectInArrayById as isNotificationActive,
} from "../utils/utils";
import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

// available notifications for user
const notifications = [
  { id: 1, title: "Quando estiver perto da minha localização" },
  { id: 2, title: "Quando estiver perto de um local personalizado" },
];

const CetaceanProfileScreen = ({ route, navigation }) => {
  const baseURL = settings.apiUrl;
  const { user } = useAuth();

  // ------ STATE MANAGEMENT -------
  const [refreshing, setRefreshing] = useState(false);
  const pressDurationRef = useRef(0);
  const [isPressing, setIsPressing] = useState(false);
  const [toolTipId, setToolTipId] = useState(0);
  const [state, setState] = useState(0);
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isCommentsRecente, setIsCommentsRecente] = useState(false);

  const [isBottomSheetActive, setBottomSheetActive] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [notificationsActive, setNotificationsActive] = useState([]);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // ---------- APIS -----------
  const [updateFavoriteApi] = useApi(usersApi.updateFavorite);
  const [deleteFavoriteApi] = useApi(usersApi.deleteFavorite);
  const [getUserApi, isLoadingUser] = useApi(usersApi.getUser);

  const [updateCommentsApi, isLoadingUpdateComments] = useApi(
    cetaceansApi.updateComments
  );

  const [getCetaceanById, isLoadingGetCetacean] = useApi(cetaceansApi.getById);
  const [deleteCommentApi, isLoadingDeleteComment] = useApi(
    cetaceansApi.deleteComment
  );

  // ---------- UTILITIES -----------

  const handleNextToolTip = () => {
    if (toolTipId <= 4) {
      setToolTipId(toolTipId + 1);
    } else if (toolTipId === 5) {
      setToolTipId(0);
    }
  };

  const update = () => {
    setState((state) => state + 1);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      updateFavoriteApi(user.id, item.individualId)
        .then()
        .catch((error) => console.log(error));
    } else {
      deleteFavoriteApi(user.id, item.individualId)
        .then()
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
    if (!isNotificationActive(inputs, id)) {
      setInputs([...inputs, newNotification]);
    } else {
      setInputs(inputs.filter((elemento) => elemento.id !== id));
    }
  };

  const handleOnChangeNotification = (text, id) => {
    let object = isNotificationActive(inputs, id);
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

  const handleMapPress = () => {
    // calculating the time passed between the press in and the press out
    const pressDuration = Date.now() - pressDurationRef.current;

    if (pressDuration < 200) {
      navigation.navigate(routes.CETACEAN_ACTIVITY, {
        individualId: item.individualId,
        delta: 180,
      });
    }
  };

  const handleMapPressIn = () => {
    // setting the time when user pressed the map
    setIsPressing(true);
    pressDurationRef.current = Date.now();
  };

  const handleMapPressOut = () => {
    setIsPressing(false);
  };
  const handleComment = (comment) => {
    setComment(comment);
  };

  const handleCommentsOrderPress = () => {
    setIsCommentsRecente(!isCommentsRecente);
    setComments([...comments.reverse()]);
  };

  const handleSubmit = async () => {
    const data = { userId: user.id, text: comment };
    const id = item.individualId;
    updateCommentsApi(data, id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        setComment("");
        update();
      });
  };

  const handleDelete = (commentId) => {
    deleteCommentApi(commentId, item.individualId)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        update();
      });
  };

  const getCetaceanPictures = () => {
    const pictures = [
      `${baseURL}\\${item.picture.src}`,
      `${baseURL}\\${item.picture.src.replace(/\.jpg$/, "")}2.jpg`,
      `${baseURL}\\${item.picture.src.replace(/\.jpg$/, "")}3.jpg`,
      `${baseURL}\\${item.picture.src.replace(/\.jpg$/, "")}4.jpg`,
    ];
    return pictures;
  };

  const renderComment = ({ item, index }) => {
    const commentId = item._id;
    return (
      <Comment
        disabledDelete={isLoadingDeleteComment}
        onDelete={() => handleDelete(commentId)}
        item={item}
        index={index}
      />
    );
  };

  const storeNotifications = async () => {
    try {
      await cache.store(`notifications${item.name}`, notificationsActive);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const notifications = await cache.get(`notifications${item.name}`);
      setNotificationsActive(notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    getUserApi(user.id)
      .then((response) => {
        if (response.favorites.includes(item.individualId)) {
          setIsFavorite(true);
        }
        if (response.visited.includes(item.individualId)) {
          setIsVisited(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCetacean = () => {
    getCetaceanById(item.individualId)
      .then((response) => {
        setComments(response.cetacean.comments);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsCommentsRecente(false);
      });
  };

  // ----------- LIFECYCLE HOOKS ------------
  useEffect(() => {
    inputs.length != 0 && storeNotifications();
  }, [notificationsActive]);

  useEffect(() => {
    getUser();
    getNotifications();
    getCetacean();
    console.log("Notificações --> ", notificationsActive);
  }, []);

  useEffect(() => {
    setComments([]);
    getCetacean();
  }, [state]);

  const onRefresh = () => {
    setRefreshing(true);
    setComments([]);
    getNotifications();
    getCetacean();
    getUser();
    setRefreshing(false);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Swiper
            nextButton={
              <MaterialIcons
                name="keyboard-arrow-right"
                color={defaultStyles.colors.medium}
                size={40}
              />
            }
            prevButton={
              <MaterialIcons
                name="keyboard-arrow-left"
                color={defaultStyles.colors.medium}
                size={40}
              />
            }
            showsPagination={false}
            showsButtons={true}
          >
            {getCetaceanPictures().map((picture, index) => (
              <View key={index} style={styles.slide}>
                <Image style={styles.image} source={{ uri: picture }} />
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.profileContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.profileContent}>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <AppText numberOfLines={3} style={styles.cetaceanName}>
                    {item.name}
                  </AppText>
                </View>
                <View style={[styles.headerIcons]}>
                  {!isLoadingUser && (
                    <IconButton
                      animate
                      onPress={handleFavoritePress}
                      name={selectFavoriteIcon()[0]}
                      color={selectFavoriteIcon()[1]}
                      size={32}
                    />
                  )}
                  <IconButton
                    onPress={handleNotificationPress}
                    name={selectNotificationIcon()}
                    color={defaultStyles.colors.black}
                    size={32}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AppText style={styles.title}>Detalhes</AppText>

                <ToolTip
                  containerStyle={{
                    width: 200,
                    height: 130,
                    backgroundColor: defaultStyles.colors.thirdly,
                    elevation: 2,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                  popover={
                    <>
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <AppText style={styles.toolTipTitle}>
                            {toolTips[toolTipId].title}
                          </AppText>
                          <AppText style={styles.toolTipDescription}>
                            {toolTips[toolTipId].description}
                          </AppText>
                        </View>
                        <LinkButton
                          color="secondary"
                          style={styles.toolTipNext}
                          title="Próximo"
                          onPress={handleNextToolTip}
                        />
                      </View>
                    </>
                  }
                  backgroundColor={defaultStyles.colors.thirdly}
                >
                  <MaterialCommunityIcons
                    style={{ marginLeft: 10, marginTop: 10 }}
                    name="information-outline"
                    size={22}
                  />
                </ToolTip>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <ListDetails details={item.details} />
              </ScrollView>
              <AppText>{`IndividualId: ${item.individualId}`}</AppText>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText style={styles.title}>Monitorização</AppText>
                <ToolTip
                  containerStyle={{
                    width: 200,
                    height: 280,
                    backgroundColor: defaultStyles.colors.thirdly,
                    elevation: 2,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                  popover={
                    <View>
                      <AppText style={styles.toolTipTitle}>
                        Início da monitorização
                      </AppText>
                      <AppText style={styles.toolTipDescription}>
                        Momento em que o animal começou a ser acompanhado e
                        registado pelo sensor, mostrando os seus eventos no
                        mapa.
                      </AppText>
                      <AppText style={styles.toolTipTitle}>
                        Fim da monitorização
                      </AppText>
                      <AppText style={styles.toolTipDescription}>
                        Encerramento do período de monitorização do animal,
                        indicando que não há mais registos de eventos
                        disponíveis.
                      </AppText>
                    </View>
                  }
                  backgroundColor={defaultStyles.colors.thirdly}
                >
                  <MaterialCommunityIcons
                    style={{ marginLeft: 10, marginTop: 10 }}
                    name="information-outline"
                    size={22}
                  />
                </ToolTip>
              </View>
              <View style={styles.timestampContainer}>
                <AppText>
                  <AppText style={styles.timestampText}>{`Início: `}</AppText>
                  <AppText>{formatDate(item.timestamp_start)}</AppText>
                </AppText>
                <AppText>
                  <AppText style={styles.timestampText}>{`Fim: `}</AppText>
                  <AppText>{formatDate(item.timestamp_end)}</AppText>
                </AppText>
              </View>
              <TextSection
                titleStyle={styles.title}
                title="Introdução"
                content={item.introduction}
              />
              <TextSection
                titleStyle={styles.title}
                title="Caraterísticas físicas e Taxonomia"
                content={item.physic}
              />
              <TextSection
                titleStyle={styles.title}
                title="Comportamento e Fisiologia"
                content={item.socialBehavior}
              />
              <TextSection
                titleStyle={styles.title}
                title="História"
                content={item.history}
              />
              <TextSection
                title="Rota de migração"
                titleStyle={styles.title}
                subTitleStyle={styles.subTitle}
                subTitle="Distribuição e Abundância"
                content={item.migration}
              />
              <AppText style={styles.subTitle}>
                Descobre a jornada{" "}
                {item.details[0].value == "Golfinho"
                  ? `do`
                  : item.details[0].value == "Baleia"
                  ? `da`
                  : `da`}{" "}
                {item.name}
              </AppText>
              <TouchableHighlight
                onPressIn={handleMapPressIn}
                onPressOut={handleMapPressOut}
                style={styles.mapContainer}
                onPress={handleMapPress}
              >
                <Map
                  mini
                  style={styles.map}
                  initialRegion={{
                    latitude: -13.687117,
                    longitude: -15.590558,
                    latitudeDelta: 180,
                    longitudeDelta: 180,
                  }}
                ></Map>
              </TouchableHighlight>
              {isVisited && (
                <>
                  <AppText style={styles.title}>Comentários</AppText>
                  {comments.length >= 2 && (
                    <AppSecondaryButton
                      onPress={handleCommentsOrderPress}
                      title={
                        isCommentsRecente
                          ? "Ordenar por antigos"
                          : "Ordenar por recentes"
                      }
                      style={styles.orderButton}
                      styleText={{ fontSize: 15 }}
                    />
                  )}
                  <AppTextInput
                    style={styles.inputComment}
                    submitIcon
                    submitDisabled={isLoadingUpdateComments}
                    onSubmit={handleSubmit}
                    size={25}
                    maxLength={50}
                    value={comment}
                    onChangeText={(text) => handleComment(text)}
                    icon="comment"
                    placeholder="Adicione um comentário..."
                  />
                  {comments.length != 0 ? (
                    <FlatList
                      style={styles.commentsBox}
                      horizontal={false}
                      nestedScrollEnabled
                      showsVerticalScrollIndicator
                      data={comments}
                      renderItem={renderComment}
                      ItemSeparatorComponent={() => (
                        <ListItemSeparator
                          width="95%"
                          color={defaultStyles.colors.transparent}
                        />
                      )}
                    />
                  ) : isLoadingGetCetacean ||
                    isLoadingUpdateComments ||
                    isLoadingDeleteComment ? (
                    <Skeleton style={styles.skeletonComments} />
                  ) : !isLoadingGetCetacean && comments.length == 0 ? (
                    <NoContentCard
                      msg="Ainda não há comentários"
                      style={styles.noContentCard}
                    />
                  ) : null}
                </>
              )}
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
    left: 0,
    right: 0,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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
    justifyContent: "flex-end",
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

  subTitle: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
    color: defaultStyles.colors.secondary,
    marginTop: 10,
  },
  optionInactive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  orderButton: {
    width: 210,
    paddingVertical: 2,
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
  inputComment: { width: "99%", paddingVertical: 8 },
  commentsBox: {
    paddingVertical: 5,
    width: "99%",
    alignSelf: "center",
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    borderRadius: 20,
    marginTop: 5,
    maxHeight: 300,
  },
  skeletonComments: { height: 200, width: "100%", marginTop: 5 },
  noContentCard: { height: 200, marginTop: 5 },
  timestampContainer: {
    marginTop: 5,
    backgroundColor: defaultStyles.colors.secondary,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 90,
    width: "100%",
    borderRadius: 15,
    elevation: 2,
  },
  timestampText: {
    fontWeight: "bold",
  },
  map: { width: "100%", height: 250 },
  mapContainer: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 15,
  },
  toolTipTitle: { fontSize: 15, fontWeight: "bold" },
  toolTipDescription: { fontSize: 14, marginBottom: 5 },
  toolTipNext: { alignSelf: "flex-end", fontSize: 18 },
});

export default CetaceanProfileScreen;
