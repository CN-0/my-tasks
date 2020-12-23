import Axios from "axios";

import * as actionTypes from "./actionsTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, username, tasks) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
    tasks: tasks,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const changeError = (error) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_ERROR, error: error });
  };
};

export const logout = (token) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post(
      "/users/logout",
      { logout: "logout" },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        localStorage.removeItem("mytasks");
        dispatch({ type: actionTypes.AUTH_LOGOUT });
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const login = (loginData) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post("/users/login", loginData)
      .then((res) => {
        localStorage.setItem("mytasks", JSON.stringify(res.data));
        dispatch(
          authSuccess(
            res.data.token,
            res.data.user.username,
            res.data.user.tasks
          )
        );
      })
      .catch((err) => {
        dispatch(authFail(err.res.data.msg));
      });
  };
};

export const register = (registerData) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post("/users/register", registerData)
      .then((res) => {
        localStorage.setItem("mytasks", JSON.stringify(res.data));
        dispatch(
          authSuccess(
            res.data.token,
            res.data.user.username,
            res.data.user.tasks
          )
        );
      })
      .catch((err) => {
        dispatch(authFail(err.res.data.msg));
      });
  };
};

export const createTask = (token, taskData, tasks) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post(
      "/tasks/add",
      { task: taskData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const mytasks = localStorage.getItem("mytasks");
        let newData = JSON.parse(mytasks);
        newData.user.tasks = [...tasks, res.data.task];
        localStorage.setItem("mytasks", JSON.stringify(newData));
        dispatch({
          type: actionTypes.ADD_TASK,
          tasks: [...tasks, res.data.task],
        });
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const changeStatus = (token, data, tasks) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.patch(
      "/tasks/change-status",
      { task: data },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        let taskIndex = tasks.findIndex((x) => x._id === res.data.task._id);
        tasks[taskIndex] = res.data.task;
        const mytasks = localStorage.getItem("mytasks");
        let newData = JSON.parse(mytasks);
        newData.user.tasks = [...tasks];
        localStorage.setItem("mytasks", JSON.stringify(newData));
        dispatch({
          type: actionTypes.ADD_TASK,
          tasks: [...tasks],
        });
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.msg));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const mytasks = localStorage.getItem("mytasks");
    if (!mytasks) {
      //dispatch(logout());
    } else {
      const data = JSON.parse(mytasks);
      dispatch(authSuccess(data.token, data.user.username, data.user.tasks));
    }
  };
};
