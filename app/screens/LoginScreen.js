import React, { useState } from "react";
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
import { AppButton, LinkButton } from "../components/Buttons";

import defaultStyles from "../config/styles";

const schema = yup.object({
  username: yup.string().required("Por favor, introduza o nome de utilizador."),
  password: yup.string().required("Por favor, introduza a palavra-passe."),
});

const LoginScreen = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const login = (data) => {
    console.log(data);
    reset();
    //navigation.navigate("Register");
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
              <Controller
                name="username"
                control={control}
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
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    error={errors.password?.message}
                    onChangeText={onChange}
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
