import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import AppText from "../components/AppText";
import { BoxItem } from "../components/Items";

import routes from "../navigation/routes";

const items = [
  {
    id: 0,
    title: "Funcionalidades",
    subTitle: "Obtem dicas para explorar as principais funcionalidades",
    icon: "stars",
    target: routes.FEATURE,
  },
  {
    id: 1,
    title: "Contactos",
    subTitle: "Contacta-nos para qualquer questão",
    icon: "phone",
    target: "",
  },
];

const AboutScreen = ({ navigation }) => {
  const handlePressItem = ({ target }, navigation) => {
    navigation.navigate(target);
  };

  const renderItem = ({ item }) => {
    return (
      <BoxItem onPress={() => handlePressItem(item, navigation)} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Sobre Fin Tracker</AppText>
      <AppText style={styles.subTitle}>
        O Fin Tracker é uma aplicação móvel que permite ao público em geral
        explorar as migrações de cetáceos e outros animais marinhos que tenham
        sido marcados.
      </AppText>
      <View style={styles.itemsContainer}>
        <FlatList
          numColumns={2}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: { lineHeight: 22, textAlign: "justify" },
  itemsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default AboutScreen;
