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

import { WavyHeader } from "../components/Waves";
import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import { AppText } from "../components/Text";
import { AppButton, LinkButton } from "../components/Buttons";
import { ErrorMessage } from "../components/Alerts";
import ActivityIndicator from "../components/Loaders/ActivityIndicator";

import useApi from "../hooks/useApi";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const schema = yup.object({
  email: yup.string().required("Por favor, introduz o email."),
  password: yup.string().required("Por favor, introduz a palavra-passe."),
});

const LoginScreen = ({ navigation }) => {
  // retrieve the user logged
  const { logIn } = useAuth();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ------- APIS ------
  const [loginApi, isLoading, error] = useApi(authApi.login);

  // ------ UTILITIES -------
  const handleForgotPassword = () => {
    navigation.navigate(routes.FORGOT_PASSWORD);
  };

  const handleRegisterPress = () => {
    navigation.navigate(routes.REGISTER);
  };

  const login = (data) => {
    loginApi(data)
      .then((response) => {
        reset();
        logIn(response.token);
      })
      .catch((error) => {
        console.log(error);
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
              <AppText style={styles.text}>{`Bem-vindo de volta, 
Inicia Sessão!`}</AppText>
              <View style={styles.formContainer}>
                <ErrorMessage error={error} />
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
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppTextInput
                      autoCorrect={false}
                      error={errors.password?.message}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      size={25}
                      icon="lock"
                      value={value}
                      placeholder="Palavra-passe"
                      secureTextEntry
                    />
                  )}
                />
                <LinkButton
                  style={styles.forgotPassword}
                  title="Esqueci-me da palavra-passe"
                  onPress={handleForgotPassword}
                  color="secondary"
                />
                <AppButton
                  disabled={errors.username || errors.password ? true : false}
                  style={[
                    styles.button,
                    {
                      opacity: errors.username || errors.password ? 0.5 : 1,
                    },
                  ]}
                  title="Iniciar Sessão"
                  onPress={handleSubmit(login)}
                />
                <View style={styles.register}>
                  <AppText style={{ paddingHorizontal: 2 }}>
                    Ainda não tens uma conta criada?
                  </AppText>
                  <LinkButton
                    onPress={handleRegisterPress}
                    style={{ paddingHorizontal: 2 }}
                    title="Registar"
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
  forgotPassword: { alignSelf: "flex-end", fontSize: 15 },
  button: {
    width: "100%",

    marginTop: 30,
  },
  register: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default LoginScreen;
