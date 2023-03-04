import React from "react";

import ListSettings from "../components/Lists/ListSettings";

import defaultStyles from "../config/styles";

const AccountScreen = () => {
  const menuItems = [
    {
      id: 1,
      title: "Palavra-passe",
      icon: {
        name: "key",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "Password",
    },
    {
      id: 2,
      title: "Nome de perfil",
      icon: {
        name: "pencil",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "",
    },
    {
      id: 3,
      title: "Foto de perfil",
      icon: {
        name: "camera-account",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "",
    },
    {
      id: 4,
      title: "Eliminar conta",
      icon: {
        name: "delete",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: "DeleteAccount",
    },
  ];
  return <ListSettings menuItems={menuItems} />;
};

export default AccountScreen;
