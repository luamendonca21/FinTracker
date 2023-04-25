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
const getNear = async (data) => {
  console.log("DADOS", data);
  const { lat, long } = data;
  try {
    const response = await ApiManager.get(`/eventsNear/${long}/${lat}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  storeEvent,
  deleteAllEvents,
  getAllEvents,
  getNear,
};
