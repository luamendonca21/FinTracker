import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import ListSettings from "../components/Lists/ListSettings";
import defaultStyles from "../config/styles";

const SettingsScreen = (props) => {
  const menuItems = [
    {
      id: 1,
      title: "Conta",
      icon: {
        name: "account-settings",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
    {
      id: 2,
      title: "Notificações",
      icon: {
        name: "bell",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
    {
      id: 3,
      title: "Permissões",
      icon: {
        name: "account-lock",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
    {
      id: 4,
      title: "Sobre",
      icon: {
        name: "information",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
  ];
  return (
    <ListSettings
      menuItems={menuItems}
      onPress={() => console.log("Pressed")}
    />
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
