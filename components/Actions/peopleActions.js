import { GET_PEOPLE_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get people data
export const getPeopledata = () => (dispatch) => {
  axios
    .get(config.server + "/api/peoples/all")
    .then((res) => {
      dispatch({
        type: GET_PEOPLE_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Add people data
export const addPeopledata = (formdata) => (dispatch) => {
  axios({
    method: "POST",
    url: config.server + "/api/peoples/add",
    data: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(() => {
      dispatch(getPeopledata());
    })
    .catch((err) => console.log(err));
};

// Delete people data
export const delPeopledata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/peoples/delete", paramData)
    .then(() => {
      dispatch(getPeopledata());
    })
    .catch((err) => console.log(err));
};
