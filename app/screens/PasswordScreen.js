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

import Screen from "../components/Screen";
import { AppTextInput } from "../components/Inputs";
import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import { ErrorMessage } from "../components/Alerts";

import defaultStyles from "../config/styles";

const schema = yup.object({
  currentPassword: yup
    .string()
    .required("Por favor, introduza a palavra-passe."),
  currentPasswordConfirmation: yup
    .string()
    .required("Por favor, introduza a palavra-passe."),
  newPassword: yup.string().required("Por favor, introduza a palavra-passe."),
});
const PasswordScreen = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const changePassword = (data) => {
    setIsLoading(true);
    console.log(data);
    // api request
    setIsLoading(false);
    reset();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Screen>
          <View style={styles.container}>
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
                    icon="lock"
                    value={value}
                    placeholder="Palavra-passe atual"
                    secureTextEntry
                  />
                )}
              />
              <Controller
                name="currentPasswordConfirmation"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    autoCorrect={false}
                    error={errors.currentPasswordConfirmation?.message}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    size={25}
                    icon="lock"
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
                    icon="lock"
                    value={value}
                    placeholder="Nova palavra-passe"
                    secureTextEntry
                  />
                )}
              />
              <AppButton
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
                title="Alterar palavra-passe"
                onPress={handleSubmit(changePassword)}
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
  formContainer: {},
  button: {
    width: "100%",

    marginTop: 30,
  },
});

export default PasswordScreen;
