import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT
} from "./types";

// set loading
export const setLoading = () => {
  return { type: SET_LOADING };
};

// set current log
export const setCurrent = log => {
  return { type: SET_CURRENT, payload: log };
};

// clear current log
export const clearCurrent = () => {
  return { type: CLEAR_CURRENT };
};

// get all logs (original version)
/*
export const getLogs = () => {
  return async dispatch => {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();
    dispatch({ type: GET_LOGS, payload: data });
  };
};
*/

// get all logs (refactored version)
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();

    if (!data) return;
    console.log("data", data);

    dispatch({ type: GET_LOGS, payload: data });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};

// add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    dispatch({ type: ADD_LOG, payload: data });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};

// delete log
export const deleteLog = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE"
    });
    dispatch({ type: DELETE_LOG, payload: id });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};

// update log
export const updateLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    dispatch({ type: UPDATE_LOG, payload: data });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};
