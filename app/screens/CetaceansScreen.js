import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  LayoutAnimation,
} from "react-native";

import AppText from "../components/AppText";
import { Carousel } from "../components/Carousels/ImageCarousel";
import Screen from "../components/Screen";
import SearchInput from "../components/Inputs/SearchInput";
import { ListItem, ListItemSeparator } from "../components/Lists";
import defaultStyles from "../config/styles";
import { toggleAnimation } from "../assets/animations/toggleAnimation";

const CetaceansScreen = ({ navigation }) => {
  const [cetaceans, setCetaceans] = useState([
    {
      id: 1,
      name: "Atlantic spotted Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Stenella frontalis",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 2,
      name: "Bottlenose Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Tursiops",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Bottlenose_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 3,
      name: "Common Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Delphinus delphis",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Common_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 4,
      name: "Frasers Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Lagenodelphis hosei",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Frasers_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 5,
      name: "Risso's Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Grampus griseuss",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Rissos_Dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 6,
      name: "Rough toothed Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Steno bredanensiss",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Rough_toothed_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 7,
      name: "Stripped Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Stenella coeruleoalba",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Stripped_dolphin.jpg"),
      introduction: "eu",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleListItem = () => {
    LayoutAnimation.configureNext(toggleAnimation);
  };
  const getCetaceansFiltered = () => {
    return cetaceans.filter(
      (c) =>
        c.name
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        c.details[0].title
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim())
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        underlayColor={defaultStyles.colors.transparent}
        title={item.name}
        onPress={() => navigation.navigate("CetaceansProfile", { item })}
        style={styles.listSearchItem}
        chevrons={{
          name: "chevron-right",
          size: 30,
          color: defaultStyles.colors.white,
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Screen>
          <AppText style={styles.welcomeText}>
            Bem-vindo ao fundo do oceano
          </AppText>
          <SearchInput
            mainIcon={{
              name: "search",
              size: 24,
              color: defaultStyles.colors.white,
            }}
            clearIcon={{
              name: "close",
              size: 24,
              color: defaultStyles.colors.white,
            }}
            onPress={() => setSearchQuery("")}
            value={searchQuery}
            style={styles.filterInput}
            onChangeText={(text) => handleSearch(text)}
            placeholder="Pesquisa por cetáceos..."
          />
          {searchQuery ? (
            getCetaceansFiltered() != "" ? (
              <View style={styles.searchBox}>
                <FlatList
                  nestedScrollEnabled
                  showsVerticalScrollIndicator
                  data={getCetaceansFiltered()}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => (
                    <ListItemSeparator
                      width="95%"
                      color={defaultStyles.colors.transparent}
                    />
                  )}
                />
              </View>
            ) : (
              <AppText
                style={{ marginTop: 10, color: defaultStyles.colors.white }}
              >
                Não foram encontrados cetáceos.
              </AppText>
            )
          ) : (
            <View style={styles.categoryList}>
              <View style={styles.categoryContainer}>
                <AppText style={styles.category}>Golfinhos</AppText>
                <AppText style={styles.seeMore}>
                  Desliza para ver mais...
                </AppText>
                <Carousel data={cetaceans} />
                {/* <LinkButton color="black" title="See more" /> */}
              </View>
              <View style={styles.categoryContainer}>
                <AppText style={styles.category}>Baleias</AppText>
                <AppText style={styles.seeMore}>
                  Desliza para ver mais...
                </AppText>
                <Carousel data={cetaceans} />
                {/* <LinkButton color="black" title="See more" /> */}
              </View>
            </View>
          )}
        </Screen>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
    flex: 1,
    padding: 15,
  },
  filterInput: { marginTop: 30, marginBottom: 5 },
  searchBox: {
    paddingVertical: 12,
    width: "100%",
    backgroundColor: defaultStyles.colors.transparent,
    borderRadius: 20,
    marginTop: 5,
    maxHeight: 250,
  },
  listSearchItem: { color: defaultStyles.colors.white },
  welcomeText: {
    color: defaultStyles.colors.white,
    fontSize: 22,
    fontWeight: "700",
    width: "70%",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    width: "100%",
    marginVertical: 5,
    elevation: 2,

    padding: 10,
  },
  categoryList: { flex: 1, marginBottom: 90 },
  category: {
    fontWeight: "700",
    color: defaultStyles.colors.black,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  itemTitle: {
    color: defaultStyles.colors.black,
    position: "absolute",
    fontWeight: "700",
    color: defaultStyles.colors.white,
    marginHorizontal: 10,
    marginVertical: 145,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 15,
  },
  button: {
    marginTop: 5,
  },
  seeMore: {
    color: defaultStyles.colors.gray,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default CetaceansScreen;
