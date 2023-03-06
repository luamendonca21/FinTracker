import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Icon from "./Icon";
import defaultStyles from "../config/styles";
import useMedia from "../hooks/useMedia";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileImage = ({ img }) => {
  const [image, setImage] = useState(null);
  const requestMediaPermissions = useMedia((imageUri) => setImage(imageUri));
  const handlePress = () => {
    requestMediaPermissions();
  };
  return (
    <View style={styles.container}>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <View style={styles.defaultImage}>
          <MaterialIcons
            name="person"
            size={60}
            color={defaultStyles.colors.medium}
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
  },
});

export default ProfileImage;
