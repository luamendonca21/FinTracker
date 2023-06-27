import ApiManager from "./ApiManager";

const storeCetacean = async (data) => {
  try {
    const response = await ApiManager.post(`/cetaceans`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateComments = async (data, id) => {
  try {
    const response = await ApiManager.put(`/comments/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getAllCetaceans = async () => {
  try {
    const response = await ApiManager.get(`/allCetaceans`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getById = async (id) => {
  try {
    const response = await ApiManager.get(`/cetaceans/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteAllCetaceans = async () => {
  try {
    const response = await ApiManager.delete(`/cetaceans`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteComment = async (id, cetaceanId) => {
  try {
    const response = await ApiManager.delete(`/comments/${cetaceanId}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  storeCetacean,
  updateComments,
  getAllCetaceans,
  getById,
  deleteAllCetaceans,
  deleteComment,
};
