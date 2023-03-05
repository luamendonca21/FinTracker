import ApiManager from "./ApiManager";
import authStorage from "../auth/storage";

const updateDetails = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/details`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getDetails = async (id) => {
  try {
    const response = await ApiManager.get(`/user/${id}/details`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUser = async (id) => {
  try {
    const token = await authStorage.getToken();
    const response = await ApiManager.get(`/user/${id}`);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
};
const updatePassword = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/password`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export default { updateDetails, getDetails, getUser, updatePassword };
