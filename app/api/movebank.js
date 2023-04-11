import axios from "axios";
import md5 from "md5";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import csv from "csvtojson";

const token = "2622d297-1e90-4d03-8fb0-ef2d4bf2daba";
const callMovebankAPI = async (params) => {
  const auth = {
    username: "filalves",
    password: "iKmJgeBVEz",
  };
  const url = "https://www.movebank.org/movebank/service/direct-read";
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
    auth,
  });

  if (response.status === 200) {
    //successful request
    if (response.data.includes("License Terms:")) {
      console.log("Has license terms");
      const hash = md5(response.data);
      params = { ...params, "license-md5": hash };
      const cookies = response.headers["set-cookie"];
      const secondResponse = await axios.get(url, {
        params,
        headers: { Cookie: cookies },
        Authorization: `Bearer ${token}`,
        auth,
      });
      if (secondResponse.status === 403) {
        console.log("Incorrect hash");
        return "";
      }
      return secondResponse.data;
    }
    return response.data;
  }
  return "";
};

const getIndividualsByStudy = async (study_id) => {
  const individuals = await callMovebankAPI({
    entity_type: "individual",
    study_id,
  });
  if (individuals.length > 0) {
    return await csv().fromString(individuals);
  }
  return [];
};

const getIndividualEvents = async (study_id, sensor_type_id = 653) => {
  const params = {
    entity_type: "event",
    study_id,
    sensor_type_id,
  };
  const events = await callMovebankAPI(params);
  if (events.length > 0) {
    return await csv().fromString(events);
  }
  return [];
};

export default { getIndividualsByStudy, getIndividualEvents };
