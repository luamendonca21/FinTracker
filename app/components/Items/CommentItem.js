import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { AppText } from "../Text";
import ProfileImage from "../ProfileImage";
import { Alert } from "../Alerts";
import { IconButton } from "../Buttons";

import usersApi from "../../api/user";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";

import { getTimeDifference } from "../../utils/utils";
import defaultStyles from "../../config/styles";

const PICTURE_SIZE = 100;

const CommentItem = ({ item, disabledDelete, onDelete }) => {
  const { user } = useAuth();
  const [commentUsername, setCommentUsername] = useState("");

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [getUserApi, isLoadingUser] = useApi(usersApi.getUser);

  const showAlert = () => setIsAlertVisible(true);

  const hideAlert = () => setIsAlertVisible(false);

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
            width: "60%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "50%",
            }}
          >
            <AppText numberOfLines={1} style={styles.username}>
              {commentUsername}
            </AppText>
            <AppText style={styles.commentDate}>
              {getTimeDifference(item.createdAt)}
            </AppText>
          </View>
          <AppText style={styles.text}>{item.text}</AppText>
        </View>

        {/* <View
          style={{
            maxWidth: "60%",
            justifyContent: "center",
          }}
        >
          <AppText style={styles.username}>{commentUsername}</AppText>
          <AppText style={styles.text}>{item.text}</AppText>
        </View> */}
        {user.id === item.userId && (
          <IconButton
            animate
            disabled={disabledDelete}
            style={[
              styles.deleteBtn,
              {
                opacity: disabledDelete ? 0.5 : 1,
              },
            ]}
            onPress={showAlert}
            color={defaultStyles.colors.medium}
            name="delete"
            size={24}
          />
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
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: { color: defaultStyles.colors.black },
  deleteBtn: {
    flex: 1,
    alignItems: "flex-end",
    padding: 10,
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
  commentDate: {
    marginLeft: 5,
    fontSize: 14,
    color: defaultStyles.colors.gray,
  },
});

export default CommentItem;
