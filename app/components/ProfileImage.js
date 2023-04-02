import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Icon from "./Icon";
import defaultStyles from "../config/styles";
import useMedia from "../hooks/useMedia";
import { MaterialIcons } from "@expo/vector-icons";
import settings from "../config/settings";

import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import ActivityIndicator from "./ActivityIndicator";
const ProfileImage = ({ addIcon, size, userId }) => {
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const requestMediaPermissions = useMedia((imageUri) => setImage(imageUri));
  const { user } = useAuth();
  const [addPictureApi, isLoadingAddPicture, errorAddPicture] = useApi(
    usersApi.addPicture
  );
  const [getPictureApi, isLoadingGetPicture, errorGetPicture] = useApi(
    usersApi.getPicture
  );

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

  useEffect(() => {
    const baseURL = settings.apiUrl;
    console.log(userId);
    console.log(user);
    const id = userId ? userId : user.id;
    getPictureApi(id)
      .then((response) => {
        const src = `${baseURL}\\${response.src}`;
        console.log(response);
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
  const handlePress = () => {
    requestMediaPermissions();
    setImageChanged(true);
  };
  return (
    <>
      <ActivityIndicator visible={isLoadingAddPicture || isLoadingGetPicture} />
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
            onPress={handlePress}
            style={styles.icon}
            icon="camera-plus-outline"
            size={18}
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
  icon: {
    position: "absolute",
    bottom: 60,
    right: 60,
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
