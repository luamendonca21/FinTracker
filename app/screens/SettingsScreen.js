import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem, ListItemSeparator } from "../components/Lists";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import Icon from "../components/Icon";
const SettingsScreen = (props) => {
  const menuItems = [
    {
      id: 1,
      title: "Account",
      icon: {
        name: "account-settings",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.secondary,
      },
    },
    {
      id: 2,
      title: "Notifications",
      icon: {
        name: "bell",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
    {
      id: 3,
      title: "Permissions",
      icon: {
        name: "account-lock",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
    {
      id: 4,
      title: "About",
      icon: {
        name: "information",
        iconColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.primary,
      },
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => console.log("Pressed")}
        title={item.title}
        IconComponent={
          <Icon
            style={styles.icon}
            icon={item.icon.name}
            size={20}
            iconColor={item.icon.iconColor}
            backgroundColor={item.icon.backgroundColor}
          />
        }
        chevrons={true}
      />
    );
  };
  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },

  icon: {
    marginRight: 10,
  },
});

export default SettingsScreen;
