import axios from "axios";
import authStorage from "../auth/storage";

const ApiManager = axios.create({
  baseURL: "http://192.168.1.225:3000",
});

ApiManager.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiManager;
