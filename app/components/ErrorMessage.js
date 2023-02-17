import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

const ErrorMessage = ({ error }) => {
  return error && <AppText style={styles.error}>{error}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: defaultStyles.colors.danger,
  },
});
