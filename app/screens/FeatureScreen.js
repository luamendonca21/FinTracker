import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppText } from "../components/Text";
import { AppSecondaryButton, LinkButton } from "../components/Buttons";
import Index from "../components/Carousels/IndexCarousel/Index";
import Screen from "../components/Screen";

import { features } from "../info/data";
import defaultStyles from "../config/styles";

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

  // ------- STATE MANAGEMENT ------
  const [index, setIndex] = useState(0);

  const IconComponent =
    index !== 2 && index !== 3 ? MaterialIcons : MaterialCommunityIcons;

  // ------- UTILITIES -------
  const handleClickNext = (index) => {
    if (index < features.length - 1) {
      setIndex(index + 1);
    }

    if (index == features.length - 1) navigation.goBack();
  };
  const handleClickBack = (index) => {
    if (index == 0) {
      navigation.goBack();
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Screen>
        <View style={styles.featuresContainer}>
          <IconComponent
            style={styles.icon}
            name={features[index].icon}
            color={defaultStyles.colors.thirdly}
            size={120}
          />
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
        <View style={styles.buttonsRow}>
          <LinkButton
            color="medium"
            style={styles.prevButton}
            onPress={() => handleClickBack(index)}
            title="Anterior"
          />
          <AppSecondaryButton
            title="Seguinte"
            icon={{ name: "arrow-right-thin", size: 36 }}
            index={index}
            onPress={() => handleClickNext(index)}
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
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  prevButton: { fontSize: 18 },
});

export default FeatureScreen;
