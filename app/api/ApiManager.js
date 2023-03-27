import axios from "axios";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const ApiManager = axios.create({
  baseURL: settings.apiUrl,
});

ApiManager.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiManager;
