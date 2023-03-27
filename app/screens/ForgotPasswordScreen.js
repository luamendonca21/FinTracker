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
import AppText from "../components/AppText";
import { ErrorMessage } from "../components/Alerts";
import { AppButton, LinkButton } from "../components/Buttons";
import ActivityIndicator from "../components/ActivityIndicator";

import usersApi from "../api/user";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

import defaultStyles from "../config/styles";

const schema = yup.object({
  email: yup
    .string()
    .email("Por favor, introduza um email válido.")
    .required("Por favor, introduza o email."),
});

const ForgotPasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLoginPress = () => {
    navigation.navigate(routes.LOGIN);
  };
  const [forgetPasswordApi, isLoading, error, msg] = useApi(
    usersApi.forgotPassword
  );

  const send = async (data) => {
    console.log(data);
    forgetPasswordApi(data)
      .then((response) => {
        console.log(response);
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
              <AppText
                style={styles.text}
              >{`Recuperação de palavra-passe`}</AppText>
              <AppText
                style={[styles.text, { fontSize: 16, fontWeight: "500" }]}
              >
                Introduza o email associado à sua conta e enviaremos um email
                com as instruções necessárias para alterar a sua palavra-passe.
              </AppText>
              <View style={styles.formContainer}>
                <ErrorMessage error={error} msg={msg} />
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

                <AppButton
                  disabled={errors.email ? true : false}
                  style={[
                    styles.button,
                    {
                      opacity: errors.email ? 0.5 : 1,
                    },
                  ]}
                  title="Enviar"
                  onPress={handleSubmit(send)}
                />
                <LinkButton
                  title="Iniciar Sessão"
                  onPress={handleLoginPress}
                  style={styles.login}
                  color="secondary"
                />
              </View>
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 24, fontWeight: "700", color: defaultStyles.colors.white },
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
    marginTop: 5,
  },
});

export default ForgotPasswordScreen;
