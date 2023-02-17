import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { WavyHeader } from "../components/Waves";
import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton, LinkButton } from "../components/Buttons";

import defaultStyles from "../config/styles";

const LoginScreen = (props) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let valid = true;
    if (!inputs.username) {
      handleError("Por favor, introduza o nome de utilizador", "username");
      valid = false;
    } else {
      handleError("", "username");
    }

    if (!inputs.password) {
      valid = false;
      handleError("Por favor, introduza uma password", "password");
    } else {
      handleError("", "password");
    }

    if (valid) {
      login();
    }
  };
  const login = () => {
    console.log(inputs);
    setInputs({
      username: null,
      password: null,
    });
    //navigation.navigate("Register");
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    validateInput(text, input);
  };
  const validateInput = (text, input) => {
    let errorMessage = "";
    if (!text) {
      errorMessage = "Por favor, preencha este campo";
    }
    handleError(errorMessage, input);
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <WavyHeader
          customHeight={160}
          color={defaultStyles.colors.primary}
          customWavePattern="M0,128L48,117.3C96,107,192,85,288,85.3C384,85,480,107,576,149.3C672,192,768,256,864,277.3C960,299,1056,277,1152,245.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <Screen>
          <View style={styles.container}>
            <AppText style={styles.text}>{`Bem-vindo de volta, 
Inicie Sessão!`}</AppText>
            <View style={styles.formContainer}>
              <AppTextInput
                error={errors.username}
                onChangeText={(text) => handleOnChange(text, "username")}
                size={25}
                icon="account-circle"
                placeholder="Nome de utilizador"
                value={inputs.username}
              />
              <AppTextInput
                error={errors.password}
                onChangeText={(text) => handleOnChange(text, "password")}
                size={25}
                icon="lock"
                value={inputs.password}
                placeholder="Palavra-passe"
                secureTextEntry
              />
              <LinkButton
                style={styles.forgotPassword}
                title="Esqueci-me da palavra-passe"
              />
              <AppButton
                style={styles.button}
                title="Iniciar Sessão"
                onPress={validate}
              />
            </View>
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 26, fontWeight: "700", color: defaultStyles.colors.white },
  container: { padding: 15, flex: 1 },
  formContainer: { marginTop: 180 },
  forgotPassword: { alignSelf: "flex-end", fontSize: 15 },
  button: {
    width: "100%",

    marginTop: 30,
  },
});

export default LoginScreen;
