import React from "react";
import { View, StyleSheet } from "react-native";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
const SettingsScreen = (props) => {
  return (
    <Screen>
      <View style={styles.container}>
        <AppTextInput placeholder="Email" />
        <ListItem
          onPress={() => console.log("Pressed")}
          title="Account"
          icon="email"
          chevrons={true}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
