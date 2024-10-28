import { GET_SERVERURL_DATA, GET_ROLE_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// Get server name with flag = true
export const getServerdata = () => (dispatch) => {};

// get serverurl
export const getServerurl = () => (dispatch) => {
  axios
    .get(config.server + "/api/settings/all")
    .then((res) => {
      dispatch({
        type: GET_SERVERURL_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// get role data
export const getRoledata = () => (dispatch) => {
  axios
    .get(config.server + "/api/settings/roleall")
    .then((res) => {
      dispatch({
        type: GET_ROLE_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Add serverurl
export const addServerurl = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/settings/add", paramData)
    .then(() => {
      dispatch(getServerurl());
    })
    .catch((err) => console.log(err));
};

// Add role data
export const addRoledata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/settings/roleadd", paramData)
    .then(() => {
      dispatch(getRoledata());
    })
    .catch((err) => console.log(err));
};

// Delete serverurl data
export const delServerurl = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/settings/delete", paramData)
    .then(() => {
      dispatch(getServerurl());
    })
    .catch((err) => console.log(err));
};

// Using this url to serverurl
export const editServerurl = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/settings/set", paramData)
    .then(() => {
      dispatch(getServerurl());
    })
    .catch((err) => console.log(err));
};

// Edit role data
export const editRoledata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/settings/editrole", paramData)
    .then(() => {
      dispatch(getRoledata());
    })
    .catch((err) => console.log(err));
};
