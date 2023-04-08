import ApiManager from "./ApiManager";

const storeCetacean = async (data) => {
  try {
    const response = await ApiManager.post(`/cetaceans`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getAllCetaceans = async () => {
  try {
    const response = await ApiManager.get(`/cetaceans`);
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

export default { storeCetacean, getAllCetaceans, deleteAllCetaceans };
