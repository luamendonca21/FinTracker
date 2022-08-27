import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const SettingsScreen = (props) => {
  const menuItems = [
    { id: 1, title: "Account", icon: "account-settings" },
    { id: 2, title: "Notifications", icon: "bell" },
    { id: 3, title: "Permissions", icon: "account-lock" },
    { id: 4, title: "About", icon: "information" },
  ];

  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => console.log("Pressed")}
        title={item.title}
        icon={item.icon}
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
  },
});

export default SettingsScreen;
