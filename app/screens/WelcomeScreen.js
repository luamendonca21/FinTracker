import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import LinkButton from "../components/LinkButton";
import WavyFooter from "../components/WavyFooter";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
const WelcomeScreen = (props) => {
  return (
    <Screen>
      <WavyFooter
        customHeight={400}
        customButtom={110}
        color="#5990FF"
        customWavePattern="M0,192L48,181.3C96,171,192,149,288,122.7C384,96,480,64,576,64C672,64,768,96,864,122.7C960,149,1056,171,1152,149.3C1248,128,1344,64,1392,32L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        style={styles.wave}
      />
      <View style={styles.container}>
        <AppText style={styles.title}>Welcome to Fin Tracker App</AppText>
        <AppText style={styles.subTitle}>
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
  title: { fontSize: 18, fontWeight: "bold", padding: 10 },
  subTitle: {
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
