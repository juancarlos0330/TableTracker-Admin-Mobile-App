import { GET_ACTIVITY_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get activities data

export const getActivitiesdata = () => (dispatch) => {
  axios
    .get(config.server + "/api/activities/all")
    .then((res) => {
      dispatch({
        type: GET_ACTIVITY_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// add activity
export const addActivity = (formdata) => (dispatch) => {
  axios({
    method: "POST",
    url: config.server + "/api/activities/add",
    data: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Delete activity
export const delActivity = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/delete", paramData)
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Add tool name amount
export const addToolNameAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/tooladd", params)
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Add material name amount
export const addMaterialNameAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/matadd", params)
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Add people name
export const addPeopleNameAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/peopleadd", params)
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Add subactivity name amount
export const addSubacvitivyNameAmount = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/subactadd", params)
    .then(() => {
      dispatch(getActivitiesdata());
    })
    .catch((err) => console.log(err));
};

// Delete sub material
export const submatdel = (params) => (dispatch) => {
  axios.post(config.server + "/api/activities/submatdel", params).then(() => {
    dispatch(getActivitiesdata());
  });
};

// Delete sub tool
export const subtooldel = (params) => (dispatch) => {
  axios.post(config.server + "/api/activities/subtooldel", params).then(() => {
    dispatch(getActivitiesdata());
  });
};

// Delete sub people
export const subpeopledel = (params) => (dispatch) => {
  axios
    .post(config.server + "/api/activities/subpeopledel", params)
    .then(() => {
      dispatch(getActivitiesdata());
    });
};

// Delete subactivity
export const subactivitydel = (params) => (dispatch) => {
  axios.post(config.server + "/api/activities/subactdel", params).then(() => {
    dispatch(getActivitiesdata());
  });
};
