import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import usersApi from "../api/user";
import ProfileImage from "./ProfileImage";
import { Alert } from "./Alerts";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import { Skeleton } from "./Loaders";
import defaultStyles from "../config/styles";
const PICTURE_SIZE = 100;

const Comment = ({ item, disabledDelete, onDelete }) => {
  const { user } = useAuth();
  const [commentUsername, setCommentUsername] = useState("");

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [getUserApi, isLoadingUser, errorGetUser] = useApi(usersApi.getUser);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  useEffect(() => {
    getUserApi(item.userId)
      .then((response) => setCommentUsername(response.username))
      .catch((error) => console.log(error));
  }, [item]);
  return (
    <>
      <View style={styles.container}>
        <ProfileImage
          userId={item.userId}
          size={{ width: PICTURE_SIZE, height: PICTURE_SIZE }}
        />
        <View
          style={{
            maxWidth: "60%",
          }}
        >
          {!isLoadingUser ? (
            <AppText style={styles.username}>{commentUsername}</AppText>
          ) : (
            <Skeleton style={styles.usernameSkeleton} />
          )}
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{item.text}</AppText>
          </View>
        </View>
        {user.id === item.userId && (
          <TouchableOpacity
            disabled={disabledDelete}
            onPress={showAlert}
            style={{
              flex: 1,
              alignItems: "flex-end",
              opacity: disabledDelete ? 0.5 : 1,
              padding: 10,
            }}
          >
            <View style={styles.delete}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={defaultStyles.colors.medium}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Alert
        showAlert={isAlertVisible}
        msg="Tens a certeza que queres eliminar o comentário?"
        showCancelButton
        showConfirmButton
        cancelText="Cancelar"
        confirmText="Eliminar"
        cancelButtonColor={defaultStyles.colors.gray}
        confirmButtonColor={defaultStyles.colors.danger}
        onCancel={() => {
          hideAlert();
        }}
        onConfirm={() => {
          hideAlert();
          onDelete();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: defaultStyles.colors.secondary,
    padding: 5,
    borderRadius: 10,
  },
  text: { color: defaultStyles.colors.white },
  delete: {
    flexDirection: "row",
  },
  usernameSkeleton: {
    width: 50,
    height: 25,
    alignSelf: "flex-start",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Comment;
