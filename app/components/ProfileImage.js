import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Alert } from "./Alerts";
import Icon from "./Icon";
import { ActivityIndicator, Skeleton } from "./Loaders";

import useMedia from "../hooks/useMedia";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import { firebase } from "../firebaseConfig";

import settings from "../config/settings";
import defaultStyles from "../config/styles";

const ProfileImage = ({
  addIcon,
  size,
  deleteIcon,
  userId,
  loadingSkeleton,
}) => {
  // retrieve the user logged
  const { user } = useAuth();

  // ----- STATE MANAGEMENT ------
  const [alert, setAlert] = useState({
    title: "",
    showCancelButton: false,
    showConfirmButton: false,
    cancelText: "",
    confirmText: "",
  });
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoadingUpdatePicture, setIsLoadingUpdatePicture] = useState(false);
  const [isLoadingDeletePicture, setIsLoadingDeletePicture] = useState(false);

  // ----- MEDIA PERMISSIONS -----
  const requestMediaPermissions = useMedia(
    (imageUri) => setImage(imageUri),
    () => {
      showAlert({
        title: "Precisas de aceitar a permissão para aceder à galeria.",
        showCancelButton: false,
        showConfirmButton: true,
        confirmText: "Ok",
      });
    }
  );

  // ------ APIS -----
  const [updatePictureApi, errorUpdatePicture] = useApi(usersApi.updatePicture);
  const [getPictureApi, isLoadingGetPicture, errorGetPicture] = useApi(
    usersApi.getPicture
  );
  const [deletePictureApi, errorDeletePicture] = useApi(usersApi.deletePicture);

  // ----- UTILITIES -------
  const handleAddImagePress = () => {
    requestMediaPermissions();
    setImageChanged(true);
  };
  const handleDeleteImagePress = async () => {
    setIsLoadingDeletePicture(true);
    const userFolderRef = firebase.storage().ref().child(user.id);

    userFolderRef
      .listAll()
      .then((userFiles) => {
        const deletePromises = userFiles.items.map((fileRef) =>
          fileRef.delete()
        );
        return Promise.all(deletePromises);
      })
      .then(() => {
        deletePictureApi(user.id)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImage(null);
        setIsLoadingDeletePicture(false);
      });
  };

  const handleUpdatePicture = async () => {
    setIsLoadingUpdatePicture(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const userFolderRef = firebase.storage().ref().child(user.id);
    const urlStatic = `https://storage.googleapis.com/fintracker-51cdf.appspot.com/${user.id}/${filename}`;
    // Excluir todos os arquivos dentro da pasta do usuário
    try {
      const userFiles = await userFolderRef.listAll();
      userFiles.items.forEach(async (fileRef) => {
        await fileRef.delete();
      });
    } catch (error) {
      console.log(error);
    }

    // Adicionar a nova foto
    const newFileRef = userFolderRef.child(filename);
    try {
      await newFileRef.put(blob);
      updatePictureApi(user.id, { url: urlStatic })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      console.log("Nova foto adicionada com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUpdatePicture(false);
      setImageChanged(false);
    }
  };

  const handleGetPicture = () => {
    const id = userId ? userId : user.id;

    getPictureApi(id)
      .then((response) => setImage(response.userPictureUrl))
      .catch((error) => console.log(error))
      .finally(() => {
        setImageChanged(false);
      });
  };
  const showAlert = (alert) => {
    setAlert(alert);
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };
  // ------ LIFECYCLE HOOKS ------

  useEffect(() => {
    handleGetPicture();
  }, [userId]);

  useEffect(() => {
    if (imageChanged) handleUpdatePicture();
  }, [image]);

  return (isLoadingGetPicture && loadingSkeleton) || isLoadingDeletePicture ? (
    <Skeleton style={styles.image} />
  ) : isLoadingUpdatePicture ? (
    <ActivityIndicator visible={true} />
  ) : (
    <>
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
        {deleteIcon && image !== null && (
          <Icon
            onPress={() =>
              showAlert({
                title: "Tens a certeza que queres eliminar a foto de perfil?",
                showCancelButton: true,
                showConfirmButton: true,
                cancelText: "Cancelar",
                confirmText: "Eliminar",
              })
            }
            style={styles.deleteIcon}
            icon="delete-outline"
            size={16}
            iconColor={defaultStyles.colors.black}
            backgroundColor={defaultStyles.colors.white}
          />
        )}
      </View>
      <Alert
        showAlert={isAlertVisible}
        msg={alert.title}
        showCancelButton={alert.showCancelButton}
        showConfirmButton={alert.showConfirmButton}
        cancelText={alert.cancelText}
        confirmText={alert.confirmText}
        cancelButtonColor={defaultStyles.colors.gray}
        confirmButtonColor={defaultStyles.colors.danger}
        onCancel={() => {
          hideAlert();
        }}
        onConfirm={() => {
          hideAlert();
          if (alert.showCancelButton && alert.showConfirmButton) {
            handleDeleteImagePress();
          }
        }}
      />
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
