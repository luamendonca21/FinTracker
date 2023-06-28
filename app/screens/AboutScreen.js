import React, { useRef } from "react";
import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";

import Icon from "../components/Icon";
import { BoxItem } from "../components/Items";
import { TextSection } from "../components/Text";

import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const items = [
  {
    id: 0,
    title: "Funcionalidades",
    subTitle: "Obtém dicas para explorar as principais funcionalidades",
    icon: "stars",
    target: routes.FEATURE,
  },
  {
    id: 1,
    title: "Contactos",
    subTitle: "Contacta-nos para qualquer questão",
    icon: "phone",
    target: routes.CONTACTS,
  },
];

const AboutScreen = ({ navigation }) => {
  const scrollRef = useRef();

  const handlePressItem = ({ target }, navigation) =>
    navigation.navigate(target);

  const renderItem = ({ item }) => (
    <BoxItem onPress={() => handlePressItem(item, navigation)} item={item} />
  );

  return (
    <ScrollView ref={scrollRef}>
      <View style={styles.container}>
        <Icon
          style={styles.iconButton}
          onPress={() => scrollRef.current.scrollToEnd({ animated: true })}
          iconColor={defaultStyles.colors.black}
          icon="arrow-down-thick"
          size={25}
          backgroundColor={defaultStyles.colors.white}
        />
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.primary,
            },
          ]}
        >
          <View style={styles.appIcon}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/imageIcon.png")}
            />
          </View>
          <TextSection
            titleStyle={[styles.title, { color: defaultStyles.colors.white }]}
            title="Sobre Fin Tracker"
            contentStyle={[
              styles.subTitle,
              { color: defaultStyles.colors.white },
            ]}
            content="Somos uma aplicação móvel que permite ao público em geral explorar as migrações de cetáceos e outros animais marinhos que tenham sido marcados."
          />
          <View style={styles.itemsContainer}>
            <FlatList
              numColumns={2}
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={styles.box}>
          <TextSection
            titleStyle={styles.title}
            title="A nossa história"
            contentStyle={styles.subTitle}
            content="Esta aplicação foi desenvolvida como parte de uma tese de mestrado no contexto do projeto de pesquisa INTERTAGUA."
          />
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.thirdly,
            },
          ]}
        >
          <TextSection
            titleStyle={styles.title}
            title="A nossa missão"
            contentStyle={styles.subTitle}
            content="O nosso principal objetivo é consciencializar a população sobre a importância da preservação das espécies marinhas, com foco nos ecossistemas costeiros e oceânicos da Macaronésia."
          />
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.secondary,
            },
          ]}
        >
          <TextSection
            titleStyle={styles.title}
            title="Integração com o Movebank"
            contentStyle={styles.subTitle}
            content=" Ao utilizar os dados do Movebank, a nossa aplicação FinTracker garante a qualidade e a confiabilidade das informações exibidas. Com base nos registos coletados pelos sensores acoplados aos animais, oferecemos aos nossos utilizadores a oportunidade de explorar o
            comportamento migratório, as rotas de viagem e outras
            características fascinantes dos animais marinhos."
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: defaultStyles.colors.white,
    paddingBottom: 36,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  box: {
    backgroundColor: "white",
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    lineHeight: 22,
    textAlign: "center",
  },
  appIcon: {
    backgroundColor: defaultStyles.colors.white,
    marginBottom: 50,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 60, height: 60, aspectRatio: 1 },
  itemsContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  iconButton: { position: "absolute", top: 15, right: 15, zIndex: 1 },
});

export default AboutScreen;
