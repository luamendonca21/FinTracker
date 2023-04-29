import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { reloadAsync } from "expo-updates";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import { ErrorMessage } from "../components/Alerts";
import { ActivityIndicator } from "../components/Loaders";

import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import usersApi from "../api/user";

import defaultStyles from "../config/styles";

const schema = yup.object({
  username: yup.string().required("Por favor, introduz o nome de utilizador."),
});
const UsernameScreen = ({}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // retrieve the user logged
  const { user } = useAuth();

  // -------- APIS -------
  const [updateUsernameApi, isLoading, error] = useApi(usersApi.updateUsername);

  // ------ UTILITIES -------
  function handleReload() {
    reloadAsync();
  }

  const changeUsername = (data) => {
    updateUsernameApi(user.id, data)
      .then((response) => {
        handleReload();
      })
      .catch((error) => console.log(error))
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
              Define um novo nome de utilizador.
            </AppText>
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
                    //icon="account-circle"
                    placeholder="Nome de utilizador"
                  />
                )}
              />

              <AppButton
                color="secondary"
                disabled={errors.username ? true : false}
                style={[
                  styles.button,
                  {
                    opacity: errors.username ? 0.5 : 1,
                  },
                ]}
                title="Alterar"
                onPress={handleSubmit(changeUsername)}
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

export default UsernameScreen;
