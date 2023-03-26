import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

import { WavyFooter } from "../components/Waves";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { AppButton, LinkButton } from "../components/Buttons";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  const handlePressRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/icon.jpg")} />
        <AppText style={styles.title}>Fin Tracker</AppText>
      </View>
      <WavyFooter
        customHeight={windowHeight / 2.2}
        color={defaultStyles.colors.primary}
        customWavePattern="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,160C672,117,768,75,864,101.3C960,128,1056,224,1152,250.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />

      <View style={styles.footerContainer}>
        <View style={styles.welcomeContainer}>
          <AppText style={styles.welcome}>Bem-vindo a Fin Tracker</AppText>
          <AppText style={styles.welcomeDescription}>
            Segue os teus cetáceos favoritos, descobre a sua história de vida,
            migração, e recebe notificações personalizadas!
          </AppText>
        </View>
        <View style={styles.registerContainer}>
          <AppButton
            onPress={handlePressRegister}
            style={styles.button}
            title="Registar"
          />
          <View style={styles.login}>
            <AppText style={{ paddingHorizontal: 2 }}>
              Já tem uma conta criada?
            </AppText>
            <LinkButton
              onPress={handleLogin}
              style={{ paddingHorizontal: 2 }}
              title="Iniciar Sessão"
              color="secondary"
            />
          </View>
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
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    elevation: 2,
    height: "40%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  welcomeDescription: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    width: "100%",
  },
  login: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  registerContainer: {
    width: "100%",
    height: 80,
    marginTop: 10,
    justifyContent: "space-between",
  },
});

export default WelcomeScreen;
