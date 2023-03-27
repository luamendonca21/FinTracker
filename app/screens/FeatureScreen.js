import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import { AppSecondaryButton } from "../components/Buttons";
import Index from "../components/Carousels/IndexCarousel/Index";
import Screen from "../components/Screen";

import defaultStyles from "../config/styles";

const features = [
  {
    id: 0,
    title: "Localização GPS",
    icon: "location-on",
    description:
      "Podes seguir os teus cetáceos favoritos num mapa e ver a sua localização.",
  },
  {
    id: 1,
    title: "Conhecimento",
    icon: "menu-book",
    description:
      "Conheçe os teus cetáceos favoritos, aprendendo sobre a sua vida, história e migração.",
  },
  {
    id: 2,
    title: "Notificações",
    icon: "notifications",
    description:
      "Podes personalizar as tuas notificações, e definir para ser notificado se algum cetáceo estiver perto de ti ou de um local personalizado.",
  },
  {
    id: 3,
    icon: "lock-open",
    title: "Desbloquear o perfil completo do cetáceo",
    description: "Tem acesso ao perfil completo do cetáceo, visitando-o.",
  },
  {
    id: 4,
    title: "Ganha pontos",
    description: "Podes ganhar 5 pontos ao visitar um cetáceo.",
  },
  {
    id: 5,
    icon: "list",
    title: "Obter mais cetáceos",
    description: "Tem acesso a mais 5 cetáceos por cada 20 pontos que ganha.",
  },
  {
    id: 6,
    icon: "stars",
    title: "Tabela de liderança",
    description:
      "Vê a tua posição na tabela de liderança e compara-te com os outros utilizadores.",
  },
];
const FeatureScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: "none",
        position: "absolute",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: defaultStyles.colors.white,
        backgroundColor: defaultStyles.colors.white,
      },
    });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderColor: defaultStyles.colors.white,
          backgroundColor: defaultStyles.colors.white,
        },
      });
    };
  }, []);
  const [index, setIndex] = useState(0);

  const handleClick = (index) => {
    if (index < 6) {
      setIndex(index + 1);
    }

    if (index == 6) navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Screen>
        <View style={styles.featuresContainer}>
          {index != 4 && (
            <MaterialIcons
              style={styles.icon}
              name={features[index].icon}
              color={defaultStyles.colors.thirdly}
              size={120}
            />
          )}
          {index == 4 && (
            <AppText
              style={{
                fontSize: 50,
                color: defaultStyles.colors.thirdly,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              +5 pontos
            </AppText>
          )}

          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",

              width: "100%",
            }}
          >
            <AppText style={styles.title}>{features[index].title}</AppText>
            <AppText style={styles.subTitle}>
              {features[index].description}
            </AppText>
            <Index
              style={styles.indexContainer}
              items={features}
              indexSelected={index}
            />
          </View>
        </View>
        <View style={styles.button}>
          <AppSecondaryButton
            title="Seguinte"
            icon="arrow-right-thin"
            index={index}
            onPress={() => handleClick(index)}
          />
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: defaultStyles.colors.white },
  featuresContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    width: 260,
    color: defaultStyles.colors.primary,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginTop: 5,
    width: "80%",
  },
  indexContainer: {
    marginTop: 20,
  },
  button: {
    alignItems: "flex-end",
    paddingRight: 30,
    paddingBottom: 30,
  },
});

export default FeatureScreen;
