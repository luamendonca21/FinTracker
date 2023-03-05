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

import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import { ErrorMessage } from "../components/Alerts";

import useAuth from "../auth/useAuth";
import usersApi from "../api/user";

import defaultStyles from "../config/styles";

const schema = yup.object({
  username: yup.string().required("Por favor, introduza o nome de utilizador."),
});
const UsernameScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, logOut } = useAuth();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const changeUsername = (data) => {
    setIsLoading(true);
    console.log(data);
    usersApi
      .updateUsername(user.id, data)
      .then((response) => {
        setError(false);
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        setError(error.msg);
      });
    setIsLoading(false);
    reset();
  };

  return (
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
