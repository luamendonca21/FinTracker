import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Icon from "./Icon";
import ActivityIndicator from "./ActivityIndicator";

import useMedia from "../hooks/useMedia";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";

import settings from "../config/settings";
import defaultStyles from "../config/styles";

const ProfileImage = ({ addIcon, size, deleteIcon, userId }) => {
  // retrieve the user logged
  const { user } = useAuth();

  // ----- STATE MANAGEMENT ------
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  // ----- MEDIA PERMISSIONS -----
  const requestMediaPermissions = useMedia((imageUri) => setImage(imageUri));

  // ------ APIS -----
  const [addPictureApi, isLoadingAddPicture, errorAddPicture] = useApi(
    usersApi.addPicture
  );

  const [getPictureApi, isLoadingGetPicture, errorGetPicture] = useApi(
    usersApi.getPicture
  );
  const [deletePictureApi, isLoadingDeletePicture, errorDeletePicture] = useApi(
    usersApi.deletePicture
  );

  // ----- UTILITIES -------
  const handleAddImagePress = () => {
    requestMediaPermissions();
    setImageChanged(true);
  };
  const handleDeleteImagePress = () => {
    deletePictureApi(user.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleUpdatePicture = () => {
    const data = new FormData();
    data.append("name", "perfil");
    data.append("file", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    return data;
  };

  // ------ LIFECYCLE HOOKS ------

  useEffect(() => {
    const baseURL = settings.apiUrl;
    const id = userId ? userId : user.id;

    getPictureApi(id)
      .then((response) => {
        const src = `${baseURL}\\${response.src}`;
        setImage(src);
        setImageChanged(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const data = handleUpdatePicture();
    if (imageChanged)
      addPictureApi(user.id, data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
  }, [image]);

  return (
    <>
      <ActivityIndicator
        visible={
          isLoadingAddPicture || isLoadingGetPicture || isLoadingDeletePicture
        }
      />
      <View
        style={[styles.container, { width: size.width, height: size.height }]}
      >
        {image ? (
          <Image
            style={[
              styles.image,
              {
                borderColor: addIcon
                  ? defaultStyles.colors.white
                  : defaultStyles.colors.black,
              },
            ]}
            source={{ uri: image }}
          />
        ) : (
          <View style={styles.defaultImage}>
            <MaterialIcons
              name="person"
              size={addIcon ? 70 : 32}
              color={defaultStyles.colors.transparent}
            />
          </View>
        )}
        {addIcon && (
          <Icon
            onPress={handleAddImagePress}
            style={styles.addIcon}
            icon="camera-plus-outline"
            size={16}
            iconColor={defaultStyles.colors.black}
            backgroundColor={defaultStyles.colors.white}
          />
        )}
        {deleteIcon && (
          <Icon
            onPress={handleDeleteImagePress}
            style={styles.deleteIcon}
            icon="delete-outline"
            size={16}
            iconColor={defaultStyles.colors.black}
            backgroundColor={defaultStyles.colors.white}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 100,
    aspectRatio: 1,
    alignItems: "center",
  },
  addIcon: {
    position: "absolute",
    bottom: 60,
    right: 65,
  },
  deleteIcon: {
    position: "absolute",
    top: 60,
    right: 65,
  },
  image: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 100,
    aspectRatio: 1,
  },
  defaultImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: defaultStyles.colors.transparent,
    borderColor: defaultStyles.colors.white,

    borderWidth: 1,
  },
});

export default ProfileImage;
