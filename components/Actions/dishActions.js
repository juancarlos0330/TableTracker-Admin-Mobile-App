import { GET_DISH_DATA, GET_ACTIVITY_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get dish data

export const getDishesdata = () => (dispatch) => {
  axios
    .get(config.server + "/api/dishes/all")
    .then((res) => {
      dispatch({
        type: GET_DISH_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getDishActData = () => (dispatch) => {
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

export const addDishdata = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/dishes/add", paramData)
    .then(() => {
      dispatch(getDishesdata());
      dispatch(getDishActData());
    })
    .catch((err) => console.log(err));
};

// Delete dish
export const delDish = (paramData) => (dispatch) => {
  axios
    .post(config.server + "/api/dishes/delete", paramData)
    .then(() => {
      dispatch(getDishesdata());
      dispatch(getDishActData());
    })
    .catch((err) => console.log(err));
};
