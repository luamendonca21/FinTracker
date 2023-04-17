import ApiManager from "./ApiManager";
const storeEvent = async (data) => {
  try {
    const response = await ApiManager.post(`/events`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteAllEvents = async () => {
  try {
    const response = await ApiManager.delete(`/events`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getAllEvents = async () => {
  try {
    const response = await ApiManager.get(`/events`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  storeEvent,
  deleteAllEvents,
  getAllEvents,
};
