import { StyleSheet, Text, View } from "react-native";
import AppText from "./app/components/AppText";
import AppButton from "./app/components/AppButton";
export default function App() {
  return (
    <View style={styles.container}>
      <AppText>Open up App.js to start working on your app!</AppText>
      <AppButton title="Log In" />
    </View>
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
