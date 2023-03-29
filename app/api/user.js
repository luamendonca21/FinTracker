import ApiManager from "./ApiManager";

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
const updateUsername = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/username`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const forgotPassword = async (data) => {
  try {
    const response = await ApiManager.post(`/user/forgotPassword`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const addPicture = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/picture`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getPicture = async (id) => {
  try {
    const response = await ApiManager.get(`/user/${id}/picture`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export default {
  updateDetails,
  getDetails,
  getUser,
  getPicture,
  updatePassword,
  updateUsername,
  addPicture,
  forgotPassword,
};
