import {
  GET_TECHS,
  ADD_TECH,
  SET_LOADING,
  SET_CURRENT,
  TECHS_ERROR,
  DELETE_TECH
} from "../actions/types";

// set loading
export const setLoading = () => {
  return { type: SET_LOADING };
};

// set current tech
export const setCurrent = tech => async dispatch => {
  dispatch({ type: SET_CURRENT, payload: tech });
};

// get all techs
export const getTechs = () => async dispatch => {
  setLoading();
  try {
    const techs = await fetch("/techs");
    const data = await techs.json();
    dispatch({ type: GET_TECHS, payload: data });
  } catch (error) {
    dispatch({ type: TECHS_ERROR, payload: error.response.statusText });
  }
};

// add new tech
export const addTech = tech => async dispatch => {
  setLoading();
  try {
    const res = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    dispatch({ type: ADD_TECH, payload: data });
  } catch (error) {
    dispatch({ type: TECHS_ERROR, payload: error.response.statusText });
  }
};

// delete tech
export const deleteTech = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, {
      method: "DELETE"
    });
    dispatch({ type: DELETE_TECH, payload: id });
  } catch (error) {
    dispatch({ type: TECHS_ERROR, payload: error.response.statusText });
  }
};
