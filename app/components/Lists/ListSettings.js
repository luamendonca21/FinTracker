import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Alert } from "../Alerts";
import { ListItem, ListItemSeparator } from "../../components/Lists";
import Icon from "../../components/Icon";
import useAuth from "../../auth/useAuth";

import defaultStyles from "../../config/styles";

const ListSettings = ({ menuItems }) => {
  // ------ STATE MANAGEMENT -------
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const { logOut } = useAuth();
  const navigation = useNavigation();

  // ------- UTILS -------------

  const showAlert = () => setIsAlertVisible(true);

  const hideAlert = () => setIsAlertVisible(false);

  const handlePress = (item) => {
    if (item.icon.name == "logout") {
      logOut();
    } else if (item.target == "") {
      showAlert(true);
    } else {
      navigation.navigate(item.target);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => handlePress(item)}
      title={item.title}
      IconComponent={
        <Icon
          activeOpacity={1}
          style={styles.icon}
          icon={item.icon.name}
          size={20}
          iconColor={item.icon.iconColor}
          backgroundColor={item.icon.backgroundColor}
        />
      }
      chevrons={{
        name: "chevron-right",
        size: 30,
        color: defaultStyles.colors.black,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
      />
      <Alert
        showAlert={isAlertVisible}
        msg="Esta funcionalidade ainda não está disponível."
        showConfirmButton
        confirmText="Ok"
        confirmButtonColor={defaultStyles.colors.secondary}
        onConfirm={() => {
          hideAlert();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },

  icon: {
    marginRight: 10,
  },
});

export default ListSettings;
