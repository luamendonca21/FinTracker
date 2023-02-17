import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";

import { WavyHeader } from "../components/Waves";

import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";

import defaultStyles from "../config/styles";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
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

    if (!inputs.email) {
      handleError("Por favor, introduza o email", "email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      handleError("Por favor, introduza um email válido", "email");
      valid = false;
    } else {
      handleError("", "email");
    }

    if (!inputs.password) {
      valid = false;
      handleError("Por favor, introduza uma password", "password");
    } else if (inputs.password.length < 6) {
      handleError(
        "Por favor, introduza uma password com no mínimo 6 caracteres",
        "password"
      );
      valid = false;
    } else {
      handleError("", "password");
    }

    if (valid) {
      register();
    }
  };
  const register = () => {
    console.log(inputs);
    setInputs({
      username: "",
      email: "",
      password: "",
    });
    navigation.navigate("Login");
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    validateInput(text, input);
  };
  const validateInput = (text, input) => {
    let errorMessage = "";
    if (!text) {
      errorMessage = "Por favor, preencha este campo";
    } else if (input === "email" && !/\S+@\S+\.\S+/.test(text)) {
      errorMessage = "Por favor, introduza um email válido";
    } else if (input === "password" && text.length < 6) {
      errorMessage =
        "Por favor, introduza uma password com no mínimo 6 caracteres";
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
            <AppText style={styles.text}>{`Olá, 
Regista-te!`}</AppText>
            <View style={styles.formContainer}>
              <AppTextInput
                error={errors.username}
                onChangeText={(text) => handleOnChange(text, "username")}
                size={25}
                value={inputs.username}
                icon="account-circle"
                placeholder="Nome de utilizador"
              />
              <AppTextInput
                error={errors.email}
                autoCorrect={false}
                value={inputs.email}
                onChangeText={(text) => handleOnChange(text, "email")}
                autoCapitalize="none"
                keyboardType="email-address"
                size={25}
                icon="email"
                placeholder="Email"
              />

              <AppTextInput
                value={inputs.password}
                error={errors.password}
                onChangeText={(text) => handleOnChange(text, "password")}
                size={25}
                icon="lock"
                placeholder="Palavra-passe"
                secureTextEntry
              />
              <AppButton
                disabled={errors.username || errors.email || errors.password}
                style={[
                  styles.button,
                  {
                    opacity:
                      errors.username || errors.email || errors.password
                        ? 0.5
                        : 1,
                  },
                ]}
                title="Registar"
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
  forgotPassword: {
    textAlign: "right",
  },
  button: {
    width: "100%",

    marginTop: 30,
  },
});

export default RegisterScreen;
