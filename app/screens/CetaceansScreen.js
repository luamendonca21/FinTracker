import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";

import AppText from "../components/AppText";
import { Carousel } from "../components/Carousels/ImageCarousel";
import Screen from "../components/Screen";
import { SearchInput } from "../components/Inputs";
import { ListItem, ListItemSeparator } from "../components/Lists";

import movebank from "../api/movebank";
import useApi from "../hooks/useApi";
import cetaceansApi from "../api/cetaceans";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const CetaceansScreen = ({ navigation }) => {
  // ------- STATE MANAGEMENT -------
  const [cetaceans, setCetaceans] = useState([]);

  const [info, setInfo] = useState([
    {
      id: 1,
      name: "Dolphy1",

      details: [
        { id: 1, title: "Categoria", value: "Golfinho" },
        {
          id: 2,
          title: "Nome Científico",
          value: "Steno bredanensis",
        },
        { id: 3, title: "Longevidade", value: "20 anos" },
        { id: 4, title: "Estado de conservação", value: "Preocupação menor" },
        {
          id: 5,
          title: "Comprimento máximo",
          value: " 2,8 metros",
        },
        { id: 6, title: "Alimentação", value: "Peixes, lulas, polvos" },
      ],
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "Steno bredanensis é uma espécie de golfinho encontrado em águas tropicais e subtropicais em todo o mundo. Sua população é pouco conhecida devido à dificuldade em observá-los no oceano aberto.",
      socialBehavior:
        "Formam grupos de até 20 indivíduos, são ágeis nadadores e realizam acrobacias.",
      physic:
        "Possui um corpo robusto e hidrodinâmico, com uma coloração acinzentada no dorso e branca no ventre. Apresenta uma nadadeira dorsal alta e triangular.",
      history:
        "A espécie Steno bredanensis foi descoberta em 1880, mas pouco se sabe sobre sua história evolutiva. Há relatos de encalhes em todo o mundo, sugerindo que esses golfinhos podem ter um alcance mais amplo do que se pensava anteriormente.",
      migration:
        "Pouco se sabe sobre a migração desses golfinhos, mas eles são frequentemente avistados em águas profundas perto de ilhas oceânicas, sugerindo que podem fazer migrações a longa distância. No entanto, mais pesquisas são necessárias para entender seus padrões de migração com mais precisão.",
    },
    {
      id: 2,
      name: "Dolphy2",
      details: [
        { id: 1, title: "Categoria", value: "Baleia" },
        {
          id: 2,
          title: "Nome Científico",
          value: "Globicephala macrorhynchus",
        },
        { id: 3, title: "Longevidade", value: "40 anos" },
        { id: 4, title: "Estado de conservação", value: "Preocupação menor" },
        {
          id: 5,
          title: "Comprimento máximo",
          value: " 5,5 metros",
        },
        {
          id: 6,
          title: "Alimentação",
          value: "Peixes, lulas, polvos, crustáceos",
        },
      ],
      imageUrl: require("../assets/dolphins/Bottlenose_dolphin.jpg"),
      introduction:
        "Globicephala macrorhynchus, também conhecido como globicefalo, é um cetáceo de tamanho médio que pode medir até 6 metros de comprimento e pesar cerca de 2 toneladas. Possui um corpo robusto e hidrodinâmico, com uma coloração acinzentada no dorso e branca no ventre. Apresenta uma nadadeira dorsal alta e triangular.",
      history:
        "A espécie é conhecida por realizar longas migrações em busca de alimento e reprodução. No Atlântico Norte, por exemplo, os globicefalos são encontrados em grandes grupos e migram sazonalmente entre as águas frias do norte e as águas quentes do sul.",
      socialBehavior:
        "Formam grupos de até 50 indivíduos, são ágeis nadadores e realizam acrobacias, além de possuírem um comportamento de enfaixamento.",
      physic:
        "Possuem uma coloração preta com manchas brancas na região ventral e uma testa proeminente.",
      migration:
        "Assim como outras espécies de cetáceos, o globicefalo enfrenta ameaças como a pesca acidental, a poluição sonora e a ingestão de plástico. Além disso, alguns países ainda praticam a caça de globicefalos, o que coloca em risco a sobrevivência da espécie.",
    },
    {
      id: 3,
      name: "Dolphy3",
      details: [
        { id: 1, title: "Categoria", value: "Orca" },
        {
          id: 2,
          title: "Nome Científico",
          value: "Pseudorca crassidens",
        },
        { id: 3, title: "Longevidade", value: "35 anos" },
        { id: 4, title: "Estado de conservação", value: "Dados insuficientes" },
        {
          id: 5,
          title: "Comprimento máximo",
          value: " 5 metros",
        },
        {
          id: 6,
          title: "Alimentação",
          value: "Peixes, lulas, polvos, tubarões",
        },
      ],
      imageUrl: require("../assets/dolphins/Common_dolphin.jpg"),
      introduction:
        "Pseudorca crassidens, também conhecido como falsa orca, é um cetáceo de tamanho médio que pode medir até 6 metros de comprimento e pesar cerca de 2 toneladas. Possui uma coloração preta ou cinza escura, com uma mancha branca em forma de âncora na barriga.",
      socialBehavior:
        "Formam grupos de até 30 indivíduos, são ágeis nadadores e realizam acrobacias, além de possuírem um comportamento cooperativo na caça.",
      physic:
        "Possuem um corpo elegante e hidrodinâmico, com uma coloração preta ou cinza escuro.",
      history:
        "Não há muitas informações sobre a história e a migração da espécie, mas sabe-se que ela é encontrada em águas temperadas e tropicais em todo o mundo. Apesar de ser um animal pouco estudado, sabe-se que a falsa orca pode ser afetada por diversas ameaças, como a pesca acidental, a poluição sonora e a ingestão de plástico.",
      migration:
        "Não há muitas informações sobre a história e a migração da espécie, mas sabe-se que ela é encontrada em águas temperadas e tropicais em todo o mundo. Apesar de ser um animal pouco estudado, sabe-se que a falsa orca pode ser afetada por diversas ameaças, como a pesca acidental, a poluição sonora e a ingestão de plástico.",
    },

    {
      id: 4,
      name: "Dolphy4",
      details: [
        { id: 1, title: "Categoria", value: "Baleia" },
        {
          id: 2,
          title: "Nome Científico",
          value: "Physeter macrocephalus",
        },
        { id: 3, title: "Longevidade", value: "70 anos" },
        { id: 4, title: "Estado de conservação", value: "Vulnerável" },
        {
          id: 5,
          title: "Comprimento máximo",
          value: " 18 metros",
        },
        {
          id: 6,
          title: "Alimentação",
          value: "Lulas, polvos, peixes de grande porte",
        },
      ],
      imageUrl: require("../assets/dolphins/Rissos_Dolphin.jpg"),
      introduction:
        "Physeter macrocephalus, também conhecido como cachalote, é um dos maiores cetáceos existentes, podendo chegar a medir até 18 metros de comprimento e pesar cerca de 57 toneladas. Possui uma cabeça enorme em relação ao corpo, com um órgão de espermacete que pode representar até 1/3 do peso total do animal. A nadadeira dorsal é pequena e em forma de gancho. Sua coloração é cinza escuro com manchas brancas em forma de diamante na barriga e garganta.",
      socialBehavior:
        "Vivem em grupos de até 20 indivíduos, com um comportamento hierárquico bem definido, e realizam mergulhos profundos para se alimentar.",
      physic:
        "Possui uma cabeça enorme em relação ao corpo, com um órgão de espermacete que pode representar até 1/3 do peso total do animal. A nadadeira dorsal é pequena e em forma de gancho",
      history:
        "Historicamente, o cachalote foi bastante caçado por causa do seu óleo, utilizado para diversos fins, incluindo iluminação e lubrificação de máquinas. Devido à intensa caça, a população de cachalotes foi significativamente reduzida, levando à sua classificação como espécie vulnerável pela IUCN (União Internacional para a Conservação da Natureza). Atualmente, a caça é proibida em muitos países, mas a espécie ainda enfrenta ameaças como colisões com navios e a ingestão de plástico.",
      migration:
        "Quanto à migração, os cachalotes são conhecidos por realizar movimentos sazonais entre águas rasas e profundas, principalmente em busca de alimento. Alguns grupos são encontrados em regiões específicas do mundo, como o Golfo do México e o Mar Mediterrâneo.",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // -------- APIS ----------

  const [storeCetaceanApi, error] = useApi(cetaceansApi.storeCetacean);
  const [getAllCetaceansApi, errorGetAllCetaceans] = useApi(
    cetaceansApi.getAllCetaceans
  );
  const [deleteAllCetaceansApi, errorDeleteAllCetaceans] = useApi(
    cetaceansApi.deleteAllCetaceans
  );
  // ------- UTILITIES ------
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getCetaceansFiltered = () => {
    return cetaceans.filter(
      (c) =>
        c.name
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        c.details[0].value
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim())
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        underlayColor={defaultStyles.colors.transparent}
        title={`${item.name} | ${item.details[1].value}`}
        onPress={() => navigation.navigate(routes.CETACEAN_PROFILE, { item })}
        style={styles.listSearchItem}
        chevrons={{
          name: "chevron-right",
          size: 30,
          color: defaultStyles.colors.white,
        }}
      />
    );
  };

  const fetchIndividuals = async () => {
    try {
      // delete from backend
      deleteAllCetaceansApi()
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      // get the cetaceans from movebank
      const individuals = await movebank.getIndividualsByStudy(886013997);
      console.log(JSON.stringify(individuals, null, "\t"));

      // store the cetaceans in backend
      individuals.forEach((value, index) => {
        const {
          details,
          introduction,
          socialBehavior,
          physic,
          history,
          migration,
          name,
        } = info.find(
          (animal) => animal.details[1].value === value.taxon_canonical_name
        );
        const cetacean = {
          ...value,
          details,
          socialBehavior,
          physic,
          name,
          introduction,
          history,
          migration,
        };
        storeCetaceanApi(cetacean)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      });

      // get cetaceans from backend
      getAllCetaceansApi()
        .then((response) => {
          console.log(response);
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
    </>
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
