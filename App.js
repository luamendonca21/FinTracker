import {
  RecyclerViewBackedScrollViewComponent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import CetaceanProfileScreen from "./app/screens/CetaceanProfileScreen";
import UserProfileScreen from "./app/screens/UserProfileScreen";
import CetaceansScreen from "./app/screens/CetaceansScreen";
import AboutScreen from "./app/screens/AboutScreen";
import FeatureScreen from "./app/screens/FeatureScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeNavigator from "./app/navigation/HomeNavigator";
import defaultStyles from "./app/config/styles";
import myTheme from "./app/navigation/navigationTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={defaultStyles.colors.medium} />

      <NavigationContainer theme={myTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
