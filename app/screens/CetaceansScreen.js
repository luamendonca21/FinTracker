import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";

import { AppText } from "../components/Text";
import Screen from "../components/Screen";
import { SearchInput } from "../components/Inputs";
import { ListItem, ListItemSeparator } from "../components/Lists";
import CategoryCard from "../components/CategoryCard";

import useApi from "../hooks/useApi";
import cetaceansApi from "../api/cetaceans";
import routes from "../navigation/routes";
import { removeDiacritics } from "../utils/utils";

import defaultStyles from "../config/styles";

const CetaceansScreen = ({ navigation }) => {
  // ------- STATE MANAGEMENT -------
  const [cetaceans, setCetaceans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // -------- APIS ----------

  const [getAllCetaceansApi] = useApi(cetaceansApi.getAllCetaceans);
  // ------- UTILITIES ------
  const handleSearch = (query) => setSearchQuery(query);
  const getCetaceansFiltered = () => {
    return cetaceans.filter(
      (c) =>
        removeDiacritics(c.name)
          .toLowerCase()
          .trim()
          .includes(removeDiacritics(searchQuery.toLowerCase().trim())) ||
        removeDiacritics(c.details[1].value)
          .toLowerCase()
          .trim()
          .includes(removeDiacritics(searchQuery.toLowerCase().trim())) ||
        removeDiacritics(c.details[2].value)
          .toLowerCase()
          .trim()
          .includes(removeDiacritics(searchQuery.toLowerCase().trim()))
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      underlayColor={defaultStyles.colors.transparent}
      title={`${item.name} |  ${item.details[1].value} | ${item.details[2].value}`}
      onPress={() => navigation.navigate(routes.CETACEAN_PROFILE, { item })}
      style={styles.listSearchItem}
      chevrons={{
        name: "chevron-right",
        size: 30,
        color: defaultStyles.colors.white,
      }}
    />
  );

  const fetchIndividuals = async () => {
    try {
      // get cetaceans from backend
      getAllCetaceansApi()
        .then((response) => {
          setCetaceans(response.cetaceans);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // -------- LIFECYCLE HOOKS ----------

  useEffect(() => {
    fetchIndividuals();
  }, []);

  return (
    <>
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
              clearIcon={
                searchQuery && {
                  name: "close",
                  size: 24,
                  color: defaultStyles.colors.white,
                }
              }
              onPress={() => setSearchQuery("")}
              value={searchQuery}
              style={styles.searchInput}
              onChangeText={(text) => handleSearch(text)}
              placeholder="Pesquisa por cetáceos..."
            />
            {searchQuery ? (
              getCetaceansFiltered() != "" ? (
                <>
                  <View style={styles.searchBox}>
                    <FlatList
                      horizontal={false}
                      nestedScrollEnabled
                      showsVerticalScrollIndicator
                      data={getCetaceansFiltered()}
                      keyExtractor={(item) => item._id}
                      renderItem={renderItem}
                      ItemSeparatorComponent={() => (
                        <ListItemSeparator
                          width="95%"
                          color={defaultStyles.colors.transparent}
                        />
                      )}
                    />
                  </View>
                  <AppText style={styles.searchResults}>
                    Resultados: {getCetaceansFiltered().length}
                  </AppText>
                </>
              ) : (
                <AppText
                  style={{ marginTop: 10, color: defaultStyles.colors.white }}
                >
                  Não foram encontrados cetáceos.
                </AppText>
              )
            ) : (
              <View style={styles.categoryList}>
                <CategoryCard
                  title="Golfinhos"
                  subTitle="Desliza para ver mais..."
                  data={cetaceans.filter(
                    (animal) => animal.details[0].value == "Golfinho"
                  )}
                />
                <CategoryCard
                  title="Baleias"
                  subTitle="Desliza para ver mais..."
                  data={cetaceans.filter(
                    (animal) => animal.details[0].value == "Baleia"
                  )}
                />
                <CategoryCard
                  title="Orcas"
                  subTitle="Desliza para ver mais..."
                  data={cetaceans.filter(
                    (animal) => animal.details[0].value == "Orca"
                  )}
                />
              </View>
            )}
          </Screen>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
    flex: 1,
    padding: 15,
  },
  searchInput: { marginTop: 30, marginBottom: 5 },
  searchBox: {
    paddingVertical: 12,
    width: "100%",
    backgroundColor: defaultStyles.colors.transparent,
    borderRadius: 20,
    marginTop: 5,
    maxHeight: 300,
  },
  searchResults: {
    color: defaultStyles.colors.white,
    fontWeight: "bold",
    marginTop: 10,
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
  seeMore: {},
});

export default CetaceansScreen;
