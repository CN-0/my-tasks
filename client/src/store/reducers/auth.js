import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  tasks: [],
};

const authStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const changeError = (state, action) => {
  return updateObject(state, { error: action.error });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.username,
    tasks: action.tasks,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    username: null,
    error: null,
    loading: false,
    tasks: [],
  });
};

const addTask = (state, action) => {
  return updateObject(state, {
    tasks: [...action.tasks],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.CHANGE_ERROR:
      return changeError(state, action);
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    default:
      return state;
  }
};

export default reducer;
