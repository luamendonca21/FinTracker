import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import LinkButton from "../components/LinkButton";
import WavyFooter from "../components/WavyFooter";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
const windowHeight = Dimensions.get("window").height;
const WelcomeScreen = (props) => {
  return (
    <Screen>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../icon.jpg")} />
        <AppText style={styles.title}>Fin Tracker</AppText>
      </View>
      <WavyFooter
        customHeight={windowHeight / 2.2}
        color={defaultStyles.colors.primary}
        customWavePattern="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,160C672,117,768,75,864,101.3C960,128,1056,224,1152,250.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        style={styles.wave}
      />

      <View style={styles.footerContainer}>
        <AppText style={styles.welcome}>Welcome to Fin Tracker App</AppText>
        <AppText style={styles.welcomeDescription}>
          Follow your favorite cetaceans, discover their life history,
          migration, and receive personalized notifications!
        </AppText>
        <AppButton title="Sign Up" />
        <View style={styles.button}>
          <AppText>Already have an account?</AppText>
          <LinkButton title="Log In" />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 60,
    height: "20%",
    justifyContent: "center",
  },
  title: {
    marginTop: 15,
    fontSize: 26,
    fontWeight: "bold",
  },
  image: { width: 120, height: 150, transform: [{ rotate: "-20deg" }] },
  footerContainer: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    elevation: 2,
    height: "40%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  welcomeDescription: {
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
    lineHeight: 22,
  },
  wave: { position: "absolute", bottom: 0, width: "100%" },
  button: {
    width: 300,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

export default WelcomeScreen;
