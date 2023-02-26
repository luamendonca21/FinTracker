import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.1.227:3000",
});

export default ApiManager;
