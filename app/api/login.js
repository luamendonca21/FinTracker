import ApiManager from "./ApiManager";

const login = async (data) => {
  try {
    const response = await ApiManager.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { login };
