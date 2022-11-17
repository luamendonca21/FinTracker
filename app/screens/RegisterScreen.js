import React from "react";
import { View, StyleSheet } from "react-native";
import { WavyHeader } from "../components/Waves";
import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import defaultStyles from "../config/styles";

const LoginScreen = (props) => {
  return (
    <>
      <WavyHeader
        customHeight={160}
        customTop={100}
        color={defaultStyles.colors.primary}
        customWavePattern="M0,128L48,117.3C96,107,192,85,288,85.3C384,85,480,107,576,149.3C672,192,768,256,864,277.3C960,299,1056,277,1152,245.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        style={styles.wave}
      />
      <Screen>
        <View style={styles.container}>
          <AppText style={styles.text}>{`Hello, 
Sign Up!`}</AppText>
          <View style={styles.inputsContainer}>
            <AppTextInput
              size={25}
              icon="account-circle"
              placeholder="Username"
            />
            <AppTextInput size={25} icon="email" placeholder="Email" />

            <AppTextInput
              size={25}
              icon="lock"
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <View style={styles.button}>
            <AppButton title="Sign Up" />
          </View>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 26, fontWeight: "700", color: defaultStyles.colors.white },
  container: { marginTop: 10, padding: 15, flex: 1 },
  inputsContainer: { marginTop: 150 },
  forgotPassword: {
    textAlign: "right",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wave: { width: "100%", position: "absolute" },
});

export default LoginScreen;
