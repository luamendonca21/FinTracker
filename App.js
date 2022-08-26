import { StyleSheet, Text, View } from "react-native";
import AppText from "./app/components/AppText";
import AppButton from "./app/components/AppButton";
import Screen from "./app/components/Screen";
import AppTextInput from "./app/components/AppTextInput";
export default function App() {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText>Open up App.js to start working on your app!</AppText>
        <AppTextInput
          keyboardType="email-address"
          icon="email"
          placeholder="Email"
        />
        {/* <AppButton title="Log In" /> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
