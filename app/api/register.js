import ApiManager from "./ApiManager";

const register = async (data) => {
  try {
    const response = await ApiManager.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { register };
