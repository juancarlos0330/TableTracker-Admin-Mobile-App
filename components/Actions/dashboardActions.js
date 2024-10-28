import { GET_DASHBOARD_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get dish data

export const getDashboarddata = () => (dispatch) => {
  axios
    .get(config.server + "/api/orders/all")
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
