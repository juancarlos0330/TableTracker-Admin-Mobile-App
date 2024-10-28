import { GET_HISTORY_DATA } from "./constants";
import config from "../config/config";
import axios from "axios";

// get history data

export const getHistorydata = () => (dispatch) => {
  axios
    .get(config.server + "/api/history/all")
    .then((res) => {
      dispatch({
        type: GET_HISTORY_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
