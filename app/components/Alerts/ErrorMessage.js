import React from "react";
import { StyleSheet } from "react-native";

import { AppText } from "../Text";

import defaultStyles from "../../config/styles";

const ErrorMessage = ({ error, style }) => {
  return error && <AppText style={[styles.error, style]}>{error}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: defaultStyles.colors.danger,
  },
});
