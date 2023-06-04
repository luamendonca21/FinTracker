import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://192.168.1.227:3000",
  },
  staging: {
    apiUrl: "http://192.168.1.227:3000",
  },
  prod: {
    apiUrl: "https://fintracker-backend.onrender.com",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
