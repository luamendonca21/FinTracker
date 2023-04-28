import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import ProfileImage from "./ProfileImage";
import { Alert } from "./Alerts";

import useAuth from "../auth/useAuth";

import defaultStyles from "../config/styles";
const PICTURE_SIZE = 100;

const Comment = ({ item, index, onDelete }) => {
  const { user } = useAuth();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ProfileImage
          userId={item.userId}
          size={{ width: PICTURE_SIZE, height: PICTURE_SIZE }}
        />
        <View style={styles.textContainer}>
          <AppText style={styles.text}>{item.text}</AppText>
        </View>
        {user.id === item.userId && (
          <TouchableOpacity
            onPress={showAlert}
            style={{
              flex: 1,
              alignItems: "flex-end",
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
    maxWidth: "60%",
    backgroundColor: defaultStyles.colors.secondary,
    padding: 5,
    borderRadius: 10,
  },
  text: { color: defaultStyles.colors.white },
  delete: {
    flexDirection: "row",
  },
});

export default Comment;
