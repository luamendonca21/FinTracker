import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export default useMedia = (onSelectImage) => {
  const requestMediaPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Aviso",
        "Precisas de aceitar a permissão para aceder à galeria."
      );
      return;
    }
    // No permissions request is necessary for launching the image library
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!response.cancelled) {
      onSelectImage(response.uri);
    }
  };
  return requestMediaPermissions;
};
