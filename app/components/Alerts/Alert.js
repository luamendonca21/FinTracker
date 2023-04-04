import AwesomeAlert from "react-native-awesome-alerts";

import React from "react";
import { StyleSheet } from "react-native";
import defaultStyles from "../../config/styles";
const Alert = ({
  message,
  confirmText,
  cancelText,
  title,
  buttonTextStyle,
  showAlert,
  cancelButtonColor,
  confirmButtonColor,
  showCancelButton,
  showConfirmButton,
  onConfirm,
  onCancel,
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      messageStyle={styles.text}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      cancelButtonColor={cancelButtonColor}
      confirmButtonColor={confirmButtonColor}
      onCancelPressed={() => {
        onCancel();
      }}
      onConfirmPressed={() => {
        onConfirm();
      }}
      confirmButtonStyle={styles.buttonContainer}
      cancelButtonStyle={styles.buttonContainer}
      confirmButtonTextStyle={[styles.buttonText, buttonTextStyle]}
      cancelButtonTextStyle={[styles.buttonText, buttonTextStyle]}
      titleStyle={styles.title}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { width: "80%" },
  buttonText: { fontSize: 18, color: defaultStyles.colors.white },
  buttonContainer: { borderRadius: 50, width: "40%", alignItems: "center" },
  text: { fontSize: 16, color: defaultStyles.colors.black },
  title: { fontSize: 18, color: defaultStyles.colors.black },
});

export default Alert;
