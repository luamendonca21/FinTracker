import React from "react";
import { View, StyleSheet, Linking, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";

import defaultStyles from "../config/styles";

const ContactsScreen = ({ navigation }) => {
  const handleEmailPress = () => {
    const email = "fintracker@hotmail.com";
    const mailToUrl = `mailTo:${email}`;

    Linking.openURL(mailToUrl);
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={defaultStyles.colors.transparent}
        onPress={handleEmailPress}
      >
        <View style={styles.contactRow}>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="email"
            size={34}
            color={defaultStyles.colors.black}
          />
          <View style={styles.info}>
            <AppText style={styles.title}>Hotmail</AppText>
            <AppText style={styles.subTitle}>fintracker@hotmail.com</AppText>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            style={styles.icon}
            size={30}
            color={defaultStyles.colors.black}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  title: {
    color: defaultStyles.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: { lineHeight: 22, textAlign: "justify" },
  contactRow: { flexDirection: "row", alignItems: "center", padding: 10 },
  icon: { marginLeft: "auto" },
});

export default ContactsScreen;
