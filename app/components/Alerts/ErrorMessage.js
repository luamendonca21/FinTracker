import React from "react";
import { StyleSheet } from "react-native";

import { AppText } from "../Text";

import defaultStyles from "../../config/styles";

const ErrorMessage = ({ error, msg, style }) => {
  return error ? (
    <AppText style={[styles.error, style]}>{error}</AppText>
  ) : msg ? (
    <AppText style={[styles.msg, style]}>{msg}</AppText>
  ) : null;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: defaultStyles.colors.danger,
  },
  msg: { color: defaultStyles.colors.success },
});
