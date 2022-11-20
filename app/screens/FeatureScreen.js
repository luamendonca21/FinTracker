import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";
import { AppSecondaryButton } from "../components/Buttons";
import Index from "../components/Index";
import defaultStyles from "../config/styles";

const features = [
  {
    id: 0,
    title: "Localização GPS",
    description:
      "Podes seguir os teus cetáceos favoritos num mapa e ver a sua localização.",
  },
  {
    id: 1,
    title: "Conhecimento",
    description:
      "Conheçe os teus cetáceos favoritos, aprendendo sobre a sua vida, história e migração.",
  },
  {
    id: 2,
    title: "Notificações",
    description:
      "Podes personalizar as tuas notificações, e definir para ser notificado se algum cetáceo estiver perto de ti ou de um local personalizado.",
  },
  {
    id: 3,
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
    title: "Obter mais cetáceos",
    description: "Tem acesso a mais 5 cetáceos por cada 20 pontos que ganha.",
  },
  {
    id: 6,
    title: "Tabela de liderança",
    description:
      "Vê a tua posição na tabela de liderança e compara-te com os outros utilizadores.",
  },
];
const FeatureScreen = ({ props }) => {
  const [index, setIndex] = useState(0);

  const handleClick = (index) => {
    if (index != 6) {
      setIndex(index + 1);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/features/gpslocation.png")}
        ></Image>
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
          title="Next"
          index={index}
          onPress={() => handleClick(index)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 20,
    marginVertical: 30,
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    width: 260,
    color: defaultStyles.colors.primary,
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 28,
    marginTop: 5,
    width: "90%",
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
