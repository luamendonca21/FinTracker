import ApiManager from "./ApiManager";

const forgotPassword = async (data) => {
  try {
    const response = await ApiManager.post(`/user/forgotPassword`, data);
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

const getPicture = async (id) => {
  try {
    const response = await ApiManager.get(`user/${id}/picture`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUsers = async () => {
  try {
    const response = await ApiManager.get(`/users`);
    return response.data;
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

const updateDetails = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/details`, data);
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

const updatePoints = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/points`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateVisited = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/visited`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePicture = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/picture`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateFavorite = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/favorites`, {
      cetaceanId: data,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteFavorite = async (id, data) => {
  try {
    const response = await ApiManager.put(`/user/${id}/favorites/remove`, {
      cetaceanToRemove: data,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePicture = async (id) => {
  try {
    const response = await ApiManager.delete(`/user/${id}/deletePicture`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  forgotPassword,
  getDetails,
  getUser,
  getPicture,
  getUsers,
  updateDetails,
  updatePassword,
  updateUsername,
  updatePicture,
  updateVisited,
  updatePoints,
  updateFavorite,
  deleteFavorite,
  deletePicture,
};
