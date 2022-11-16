import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import BoxItem from "../components/BoxItem";
import AppText from "../components/AppText";

const items = [
  {
    id: 1,
    title: "Features",
    subTitle: "Get tips to explore the main features",
    icon: "stars",
  },
  {
    id: 2,
    title: "Contacts",
    subTitle: "Contact us for any question",
    icon: "phone",
  },
];

const AboutScreen = (props) => {
  const renderItem = ({ item }) => {
    return <BoxItem item={item} />;
  };
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.title}>About Fin Tracker</AppText>
        <AppText style={styles.subTitle}>
          Fin Tracker is a mobile application that allows the general audience
          to explore and engage the migrations of cetaceans and other marine
          animals that have been tagged.Fin Tracker is a mobile application that
          allows the general audience to explore and engage the migrations of
          cetaceans and other marine animals that have been tagged.
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
    </Screen>
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
