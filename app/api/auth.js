import ApiManager from "./ApiManager";

const register = async (data) => {
  try {
    const response = await ApiManager.post("/auth/register", data);
    return response.data;
  } catch (error) {
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
    const response = await ApiManager.delete(`/auth/${id}/remove`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { register, login, deleteAccount };
