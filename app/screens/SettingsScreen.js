import React from "react";

import ListSettings from "../components/Lists/ListSettings";

import defaultStyles from "../config/styles";

const SettingsScreen = () => {
  const menuItems = [
    {
      id: 1,
      title: "Conta",
      icon: {
        name: "account",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "Account",
    },
    {
      id: 2,
      title: "Notificações",
      icon: {
        name: "bell",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "",
    },
    {
      id: 3,
      title: "Permissões",
      icon: {
        name: "account-lock",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "",
    },
    {
      id: 4,
      title: "Sobre",
      icon: {
        name: "information",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "About",
    },
    {
      id: 5,
      title: "Terminar sessão",
      icon: {
        name: "logout",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
  ];
  return <ListSettings menuItems={menuItems} />;
};

export default SettingsScreen;
