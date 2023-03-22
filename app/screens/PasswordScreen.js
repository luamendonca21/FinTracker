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

import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import { ErrorMessage } from "../components/Alerts";
import ActivityIndicator from "../components/ActivityIndicator";

import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import usersApi from "../api/user";

import defaultStyles from "../config/styles";

const schema = yup.object({
  currentPassword: yup
    .string()
    .required("Por favor, introduza a palavra-passe."),
  newPassword: yup
    .string()
    .min(
      6,
      "Por favor, introduza uma palavra-passe com no mínimo 6 caracteres."
    )
    .required("Por favor, introduza a palavra-passe."),
  newPasswordConfirmation: yup
    .string()
    .min(
      6,
      "Por favor, introduza uma palavra-passe com no mínimo 6 caracteres."
    )
    .required("Por favor, introduza a palavra-passe."),
});
const PasswordScreen = ({}) => {
  const [updateUserPassApi, isLoading, error] = useApi(usersApi.updatePassword);
  const { user, logOut } = useAuth();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const changePassword = (data) => {
    updateUserPassApi(user.id, data)
      .then((response) => {
        console.log(response);
        logOut();
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
          <View style={styles.container}>
            <AppText style={styles.text}>
              Define uma nova palavra-passe para a sua conta, para poderes
              iniciar sessão e aceder a todas as funcionalidades.
            </AppText>
            <View style={styles.formContainer}>
              <ErrorMessage error={error} />

              <Controller
                control={control}
                name="currentPassword"
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    autoCorrect={false}
                    error={errors.currentPassword?.message}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    size={25}
                    value={value}
                    placeholder="Palavra-passe atual"
                    secureTextEntry
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    autoCorrect={false}
                    error={errors.newPassword?.message}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    size={25}
                    value={value}
                    placeholder="Nova palavra-passe"
                    secureTextEntry
                  />
                )}
              />
              <Controller
                name="newPasswordConfirmation"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    autoCorrect={false}
                    error={errors.newPasswordConfirmation?.message}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    size={25}
                    value={value}
                    placeholder="Confirmar palavra-passe"
                    secureTextEntry
                  />
                )}
              />
              <AppButton
                color="secondary"
                disabled={
                  errors.currentPassword ||
                  errors.currentPasswordConfirmation ||
                  errors.newPassword
                    ? true
                    : false
                }
                style={[
                  styles.button,
                  {
                    opacity:
                      errors.currentPassword ||
                      errors.currentPasswordConfirmation ||
                      errors.newPassword
                        ? 0.5
                        : 1,
                  },
                ]}
                title="Alterar"
                onPress={handleSubmit(changePassword)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  text: { color: defaultStyles.colors.black },
  container: { padding: 15, flex: 1 },
  formContainer: { marginTop: 10 },
  button: {
    width: "100%",

    marginTop: 30,
  },
});

export default PasswordScreen;
