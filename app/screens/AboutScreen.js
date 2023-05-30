import React, { useRef } from "react";
import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";

import AppText from "../components/AppText";
import Icon from "../components/Icon";
import { BoxItem } from "../components/Items";
import defaultStyles from "../config/styles";
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
    target: routes.CONTACTS,
  },
];

const AboutScreen = ({ navigation }) => {
  const scrollRef = useRef();

  const handlePressItem = ({ target }, navigation) => {
    navigation.navigate(target);
  };

  const renderItem = ({ item }) => {
    return (
      <BoxItem onPress={() => handlePressItem(item, navigation)} item={item} />
    );
  };

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
              /* borderTopLeftRadius: 20,
              borderTopRightRadius: 20, */
            },
          ]}
        >
          <View style={styles.appIcon}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/icon.png")}
            />
          </View>
          <AppText style={styles.title}>Sobre Fin Tracker</AppText>
          <AppText style={styles.subTitle}>
            Somos uma aplicação móvel que permite ao público em geral explorar
            as migrações de cetáceos e outros animais marinhos que tenham sido
            marcados.
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
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.white,
            },
          ]}
        >
          <AppText
            style={[styles.title, { color: defaultStyles.colors.black }]}
          >
            A nossa história
          </AppText>
          <AppText
            style={[styles.subTitle, { color: defaultStyles.colors.black }]}
          >
            Esta aplicação foi desenvolvida como parte de uma tese de mestrado
            no contexto do projeto de pesquisa INTERTAGUA.
          </AppText>
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.thirdly,
            },
          ]}
        >
          <AppText
            style={[styles.title, { color: defaultStyles.colors.black }]}
          >
            A nossa missão
          </AppText>
          <AppText
            style={[styles.subTitle, { color: defaultStyles.colors.black }]}
          >
            O nosso principal objetivo é consciencializar a população sobre a
            importância da preservação das espécies marinhas, com foco nos
            ecossistemas costeiros e oceânicos da Macaronésia.
          </AppText>
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor: defaultStyles.colors.secondary,
              /*  borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20, */
            },
          ]}
        >
          <AppText
            style={[
              styles.title,
              {
                color: defaultStyles.colors.black,
              },
            ]}
          >
            Integração com o Movebank
          </AppText>
          <AppText
            style={[
              styles.subTitle,
              {
                color: defaultStyles.colors.black,
              },
            ]}
          >
            Ao utilizar os dados do Movebank, a nossa aplicação FinTracker
            garante a qualidade e a confiabilidade das informações exibidas. Com
            base nos registos coletados pelos sensores acoplados aos animais,
            oferecemos aos nossos utilizadores a oportunidade de explorar o
            comportamento migratório, as rotas de viagem e outras
            características fascinantes dos animais marinhos.
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: defaultStyles.colors.white,
    /*     padding: 15,
     */ paddingBottom: 36,
  },
  title: {
    color: defaultStyles.colors.white,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    lineHeight: 22,
    textAlign: "center",
    color: defaultStyles.colors.white,
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
