import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";

import useAuth from "../auth/useAuth";
import authApi from "../api/auth";

import defaultStyles from "../config/styles";

const DeleteAccountScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, logOut } = useAuth();

  const deleteAccount = (data) => {
    setIsLoading(true);
    authApi
      .deleteAccount(user.id)
      .then((response) => {
        console.log(response);
        logOut();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <AppText style={styles.text}>
            Tens a certeza de que queres eliminar esta conta? Irás perder todos
            os teus dados pessoais.
          </AppText>

          <AppButton
            color="danger"
            style={styles.button}
            title="Eliminar"
            onPress={deleteAccount}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: { color: defaultStyles.colors.black },
  container: { padding: 15, flex: 1 },
  button: {
    width: "100%",

    marginTop: 30,
  },
});

export default DeleteAccountScreen;
