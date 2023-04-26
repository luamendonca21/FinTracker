import React from "react";

import ListSettings from "../components/Lists/ListSettings";

import routes from "../navigation/routes";

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
      target: routes.PASSWORD,
    },
    {
      id: 2,
      title: "Nome de utilizador",
      icon: {
        name: "pencil",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: routes.USERNAME,
    },
    {
      id: 4,
      title: "Eliminar conta",
      icon: {
        name: "delete",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
      target: routes.DELETE_ACCOUNT,
    },
  ];
  return <ListSettings menuItems={menuItems} />;
};

export default AccountScreen;
