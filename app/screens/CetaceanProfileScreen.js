import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fade from "../assets/animations/Fade";
import AppText from "../components/AppText";
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
import DeleteAction from "../components/DeleteAction";
import { NoContentCard } from "../components/Alerts";

import cache from "../utility/cache";
import cetaceansApi from "../api/cetaceans";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import useAuth from "../auth/useAuth";
import settings from "../config/settings";

import defaultStyles from "../config/styles";

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
  const [state, setState] = useState(0);
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCommentsRecente, setIsCommentsRecente] = useState(false);

  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [notificationsActive, setNotificationsActive] = useState([]);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // ---------- APIS -----------
  const [updateFavoriteApi, isLoadingUpdateFavorites, errorUpdate] = useApi(
    usersApi.updateFavorite
  );
  const [deleteFavoriteApi, isLoadingDeleteFavorites, errorDelete] = useApi(
    usersApi.deleteFavorite
  );
  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);

  const [updateCommentsApi, isLoadingUpdateComments, errorUpdateComments] =
    useApi(cetaceansApi.updateComments);

  const [getCetaceanById, isLoadingGetCetacean, errorGetCetacean] = useApi(
    cetaceansApi.getById
  );
  const [deleteCommentApi, isLoadingDeleteComment, errorDeleteComment] = useApi(
    cetaceansApi.deleteComment
  );

  // ---------- UTILITIES -----------
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const update = () => {
    setState((state) => state + 1);
  };
  const isNotificationActive = (id) => {
    return inputs.find((item) => item.id === id);
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

  const renderComment = ({ item, index }) => {
    const commentId = item._id;
    return (
      <Comment
        disabledDelete={isLoadingDeleteComment}
        onDelete={() => handleDelete(commentId)}
        renderRightActions={() => <DeleteAction />}
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
  }, []);

  useEffect(() => {
    getCetacean();
  }, [state]);

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
              <AppText style={styles.title}>Detalhes</AppText>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <ListDetails details={item.details} />
              </ScrollView>
              <AppText
                style={styles.text}
              >{`IndividualId: ${item.individualId}`}</AppText>
              <AppText style={styles.title}>Monitorização</AppText>

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
              <AppText style={styles.title}>Comentários</AppText>
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
              <AppTextInput
                style={styles.inputComment}
                submitIcon
                submitDisabled={(!comment || isLoadingUpdateComments) && true}
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
    backgroundColor: defaultStyles.colors.secondary,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 90,
    width: "100%",
    borderRadius: 20,
    elevation: 2,
  },
  timestampText: {
    fontWeight: "bold",
  },
});

export default CetaceanProfileScreen;
