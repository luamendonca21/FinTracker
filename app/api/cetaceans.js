import ApiManager from "./ApiManager";
import useApi from "../hooks/useApi";
import info from "../info/cetaceans";
import movebankApi from "./movebankApi";
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

const fetchMovebankData = async () => {
  const [storeCetaceanApi, error] = useApi(storeCetacean);
  const [deleteAllCetaceansApi, errorDeleteAllCetaceans] = useApi(
    cetaceansApi.deleteAllCetaceans
  );

  // delete from backend
  deleteAllCetaceansApi()
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  // get the cetaceans from movebank
  const individuals = await movebankApi.getIndividualsByStudy(886013997);
  console.log(JSON.stringify(individuals, null, "\t"));

  // store the cetaceans in backend
  individuals.forEach((value, index) => {
    const {
      details,
      introduction,
      socialBehavior,
      physic,
      history,
      migration,
      name,
    } = info.find(
      (animal) => animal.details[1].value === value.taxon_canonical_name
    );
    const cetacean = {
      ...value,
      details,
      socialBehavior,
      physic,
      name,
      introduction,
      history,
      migration,
    };
    storeCetaceanApi(cetacean)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  });
};

export default {
  storeCetacean,
  getAllCetaceans,
  getById,
  deleteAllCetaceans,
  fetchMovebankData,
};
