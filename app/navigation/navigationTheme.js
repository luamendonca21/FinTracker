import { DefaultTheme } from "@react-navigation/native";
import defaultStyles from "../config/styles";

const myTheme = {
  ...DefaultTheme,
  colors: {
    background: defaultStyles.colors.white,
  },
};

export default myTheme;
