import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import materialReducer from "./reducers/materialReducer";
import toolReducer from "./reducers/toolReducer";
import peopleReducer from "./reducers/peopleReducer";
import activityReducer from "./reducers/activityReducer";
import serverurlReducer from "./reducers/serverurlReducer";
import dishReducer from "./reducers/dishReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import historyReducer from "./reducers/historyReducer";
import roleReducer from "./reducers/roleReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  materials: materialReducer,
  tools: toolReducer,
  peoples: peopleReducer,
  activities: activityReducer,
  serverurl: serverurlReducer,
  roles: roleReducer,
  dishes: dishReducer,
  dashboard: dashboardReducer,
  history: historyReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
};

export default configureStore;
