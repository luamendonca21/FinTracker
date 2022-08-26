import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import LinkButton from "../components/LinkButton";
import WavyFooter from "../components/WavyFooter";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
const WelcomeScreen = (props) => {
  return (
    <Screen>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../icon.png")} />
        <AppText style={styles.title}>Fin Tracker</AppText>
      </View>
      <WavyFooter
        customHeight={400}
        customButtom={120}
        color="#5990FF"
        customWavePattern="M0,64L40,69.3C80,75,160,85,240,117.3C320,149,400,203,480,197.3C560,192,640,128,720,112C800,96,880,128,960,160C1040,192,1120,224,1200,229.3C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        style={styles.wave}
      />

      <View style={styles.footerContainer}>
        <AppText style={styles.welcome}>Welcome to Fin Tracker App</AppText>
        <AppText style={styles.welcomeDescription}>
          Follow your favorite cetaceans, discover their life history,
          migration, and receive personalized notifications!
        </AppText>
        <AppButton title="Sign Up" />
        <View style={styles.logIn}>
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
    marginTop: 100,
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
    paddingHorizontal: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  wave: { position: "absolute", bottom: 0, width: "100%" },
  logIn: {
    width: 300,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

export default WelcomeScreen;
