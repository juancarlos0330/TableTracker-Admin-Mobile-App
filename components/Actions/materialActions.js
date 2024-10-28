import { GET_MATERIAL_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get materials data
export const getMaterialdata = () => (dispatch) => {
  axios
    .get(config.server + "/api/materials/all")
    .then((res) => {
      dispatch({
        type: GET_MATERIAL_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Add materials data
export const addMaterialdata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/materials/add", paramData)
    .then(() => {
      dispatch(getMaterialdata());
    })
    .catch((err) => console.log(err));
};

// Delete materials data
export const delMaterialdata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/materials/delete", paramData)
    .then(() => {
      dispatch(getMaterialdata());
    })
    .catch((err) => console.log(err));
};

// Add material amount
export const addMaterialAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/materials/addamount", params)
    .then(() => {
      dispatch(getMaterialdata());
    })
    .catch((err) => console.log(err));
};
