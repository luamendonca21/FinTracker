import * as ImagePicker from "expo-image-picker";

export default useMedia = (onSelectImage, onPermissionDenied) => {
  const requestMediaPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      onPermissionDenied();
      return;
    }
    // No permissions request is necessary for launching the image library
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!response.canceled) {
      onSelectImage(response.assets[0].uri);
    }
  };
  return requestMediaPermissions;
};
