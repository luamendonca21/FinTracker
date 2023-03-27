import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import isEmail from "validator/lib/isEmail";

import { WavyHeader } from "../components/Waves";
import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { ErrorMessage } from "../components/Alerts";
import { AppButton, LinkButton } from "../components/Buttons";
import ActivityIndicator from "../components/ActivityIndicator";

import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const schema = yup.object({
  username: yup.string().required("Por favor, introduza o nome de utilizador."),
  email: yup
    .string()
    .required("Por favor, introduza o email.")
    .test(
      "is-valid",
      (message) => `Por favor, introduza um ${message.path} válido. `,
      (value) =>
        value ? isEmail(value) : new yup.ValidationError("Invalid value")
    ),
  password: yup
    .string()
    .min(
      6,
      "Por favor, introduza uma palavra-passe com no mínimo 6 caracteres."
    )
    .required("Por favor, introduza a palavra-passe."),
});

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLoginPress = () => {
    navigation.navigate(routes.LOGIN);
  };
  const [registerApi, isLoading, error] = useApi(authApi.register);

  const register = async (data) => {
    console.log(data);
    registerApi(data)
      .then((response) => {
        console.log(response);
        navigation.navigate(routes.LOGIN);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
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
                <ErrorMessage error={error} />
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <AppTextInput
                      error={errors.username?.message}
                      onChangeText={onChange}
                      size={25}
                      value={value}
                      icon="account-circle"
                      placeholder="Nome de utilizador"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <AppTextInput
                      error={errors.email?.message}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      size={25}
                      autoCorrect={false}
                      value={value}
                      keyboardType="email-address"
                      icon="email"
                      placeholder="Email"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <AppTextInput
                      error={errors.password?.message}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      size={25}
                      autoCorrect={false}
                      value={value}
                      icon="lock"
                      placeholder="Palavra-passe"
                      secureTextEntry
                    />
                  )}
                />
                <AppButton
                  disabled={
                    errors.username || errors.email || errors.password
                      ? true
                      : false
                  }
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
                  onPress={handleSubmit(register)}
                />
                <View style={styles.login}>
                  <AppText style={{ paddingHorizontal: 2 }}>
                    Já tem uma conta criada?
                  </AppText>
                  <LinkButton
                    onPress={handleLoginPress}
                    style={{ paddingHorizontal: 2 }}
                    title="Iniciar Sessão"
                    color="secondary"
                  />
                </View>
              </View>
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
  login: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default RegisterScreen;
