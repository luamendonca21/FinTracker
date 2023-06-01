import React from "react";

import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import Fade from "../../assets/animations/Fade";
import { AppText } from "../Text";

import defaultStyles from "../../config/styles";

const OfflineNotice = ({ isVisible, msg, icon }) => {
  return (
    <Fade
      value={1}
      duration={500}
      toast
      isVisible={isVisible}
      style={[
        styles.container,
        {
          backgroundColor: isVisible
            ? defaultStyles.colors.danger
            : defaultStyles.colors.success,
        },
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={isVisible ? icon.disconnected : icon.connected}
          size={25}
          color={defaultStyles.colors.white}
          style={styles.icon}
        />
      )}
      <AppText style={styles.text}>{msg}</AppText>
    </Fade>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    height: 50,
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    borderRadius: 15,
    alignSelf: "center",
    top: 10 + Constants.statusBarHeight,
    alignItems: "center",
    elevation: 1,
  },
  text: {
    color: defaultStyles.colors.white,
    marginHorizontal: 5,
  },
  icon: { marginHorizontal: 5 },
});

export default OfflineNotice;
