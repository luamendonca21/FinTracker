import React from "react";
import { View, StyleSheet } from "react-native";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import WavyHeader from "../components/WavyHeader";
const LoginScreen = (props) => {
  return (
    <>
      <WavyHeader
        customHeight={120}
        customTop={100}
        color="#5990FF"
        customWavePattern="M0,128L48,117.3C96,107,192,85,288,85.3C384,85,480,107,576,149.3C672,192,768,256,864,277.3C960,299,1056,277,1152,245.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        style={styles.wave}
      />
      <Screen>
        <View style={styles.container}>
          <AppText style={styles.text}>{`Welcome back, 
Log In!`}</AppText>
          <View style={styles.inputsContainer}>
            <AppTextInput icon="account-circle" placeholder="Username" />
            <AppTextInput icon="lock" placeholder="Password" secureTextEntry />
            <AppText style={styles.forgotPassword}>
              Forgot your password?
            </AppText>
          </View>
          <View style={styles.button}>
            <AppButton title="Log In" />
          </View>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 26, fontWeight: "700" },
  container: { marginTop: 10, padding: 20, flex: 1 },
  inputsContainer: { marginTop: 100 },
  forgotPassword: {
    textAlign: "right",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wave: { width: "100%" },
});

export default LoginScreen;
