import ApiManager from "./ApiManager";
import authStorage from "../auth/storage";

const register = async (data) => {
  try {
    const response = await ApiManager.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
const login = async (data) => {
  try {
    const response = await ApiManager.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteAccount = async (id) => {
  try {
    const token = await authStorage.getToken();

    const response = await ApiManager.delete(`/auth/${id}/remove`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { register, login, deleteAccount };
