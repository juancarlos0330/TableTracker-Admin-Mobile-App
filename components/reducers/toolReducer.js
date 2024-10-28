import { GET_TOOL_DATA } from "../Actions/constants";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOOL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}