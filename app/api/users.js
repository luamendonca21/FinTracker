import ApiManager from "./ApiManager";

const register = async (data) => {
  try {
    const response = await ApiManager("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { register };
