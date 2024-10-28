import { GET_TOOL_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get tools data
export const getTooldata = () => (dispatch) => {
  axios
    .get(config.server + "/api/tools/all")
    .then((res) => {
      dispatch({
        type: GET_TOOL_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Add tools data
export const addTooldata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/tools/add", paramData)
    .then(() => {
      dispatch(getTooldata());
    })
    .catch((err) => console.log(err));
};

// Delete tools data
export const delTooldata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/tools/delete", paramData)
    .then(() => {
      dispatch(getTooldata());
    })
    .catch((err) => console.log(err));
};

// Add tool amount
export const addToolAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/tools/addamount", params)
    .then(() => {
      dispatch(getTooldata());
    })
    .catch((err) => console.log(err));
};
