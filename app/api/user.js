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

export default { updateDetails, getDetails };
