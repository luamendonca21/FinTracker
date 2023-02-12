import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import BoxItem from "../components/BoxItem";
import { useNavigation } from "@react-navigation/native";
const items = [
  {
    id: 0,
    title: "Funcionalidades",
    subTitle: "Obtem dicas para explorar as principais funcionalidades",
    icon: "stars",
    target: "Features",
  },
  {
    id: 1,
    title: "Contactos",
    subTitle: "Contacta-nos para qualquer questão",
    icon: "phone",
    target: "Profile",
  },
];

const handlePressItem = ({ target }, navigation) => {
  navigation.navigate(target);
};
const AboutScreen = () => {
  const navigation = useNavigation();
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
