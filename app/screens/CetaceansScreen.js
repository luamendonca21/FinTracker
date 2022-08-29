import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "../components/AppText";
import CarouselItem from "../components/CarouselItem";
import defaultStyles from "../config/styles";

function CetaceansScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.welcomeText}>
          Welcome to the depth of the ocean
        </AppText>
        <View style={styles.cetaceansContainer}>
          <AppText style={styles.speciesText}>Dolphins</AppText>
          <View style={styles.sliderContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <CarouselItem
                title="Tursiops"
                imageUrl={require("../assets/dolphins/Atlantic_spotted_dolphin.jpg")}
              />
              <CarouselItem
                title="Tursiops"
                imageUrl={require("../assets/dolphins/Atlantic_spotted_dolphin.jpg")}
              />
              <CarouselItem
                title="Tursiops"
                imageUrl={require("../assets/dolphins/Atlantic_spotted_dolphin.jpg")}
              />
              <CarouselItem
                title="Tursiops"
                imageUrl={require("../assets/dolphins/Atlantic_spotted_dolphin.jpg")}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.tertiary,
    flex: 1,
    padding: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    width: "70%",
    marginTop: 50,
    marginBottom: 10,
  },
  cetaceansContainer: {
    borderRadius: 20,
    justifyContent: "space-between",
    backgroundColor: defaultStyles.colors.white,
    width: "100%",
    height: 250,
    marginVertical: 10,
    elevation: 1,
    padding: 10,
  },
  speciesText: {
    fontWeight: "700",
    fontSize: 18,
  },
  sliderContainer: {
    flexDirection: "row",
    height: 190,
    alignItems: "center",
  },
  item: { marginRight: 10 },
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
});

export default CetaceansScreen;
