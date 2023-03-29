import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Icon from "./Icon";
import defaultStyles from "../config/styles";
import useMedia from "../hooks/useMedia";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import ActivityIndicator from "./ActivityIndicator";
const ProfileImage = ({}) => {
  const [image, setImage] = useState(null);
  const requestMediaPermissions = useMedia((imageUri) => setImage(imageUri));
  const { user } = useAuth();
  const [addPictureApi, isLoadingAddPicture, errorAddPicture] = useApi(
    usersApi.addPicture
  );
  const [getPictureApi, isLoadingGetPicture, errorGetPicture] = useApi(
    usersApi.getPicture
  );

  const handleUpdatePicture = () => {
    if (image == null) {
      console.log("hj");
      return;
    }

    const data = new FormData();
    data.append("name", "perfil");
    data.append("file", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    return data;
  };

  /*   useEffect(() => {
    getPictureApi(user.id)
      .then((response) => response.blob())

      .then((response) => {
        setImage(URL.createObjectURL(response));
      })
      .catch((error) => console.log(error));
  }, []); */
  useEffect(() => {
    const data = handleUpdatePicture();

    data &&
      addPictureApi(user.id, data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
  }, [image]);
  const handlePress = () => {
    requestMediaPermissions();
  };
  return (
    <>
      <ActivityIndicator visible={isLoadingAddPicture || isLoadingGetPicture} />
      <View style={styles.container}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <View style={styles.defaultImage}>
            <MaterialIcons
              name="person"
              size={70}
              color={defaultStyles.colors.transparent}
            />
          </View>
        )}
        <Icon
          onPress={handlePress}
          style={styles.icon}
          icon="camera-plus-outline"
          size={18}
          iconColor={defaultStyles.colors.black}
          backgroundColor={defaultStyles.colors.white}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 100,
    height: 250,
    width: 250,
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
    borderColor: defaultStyles.colors.white,
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
    borderWidth: 1,
    borderColor: defaultStyles.colors.white,
  },
});

export default ProfileImage;
