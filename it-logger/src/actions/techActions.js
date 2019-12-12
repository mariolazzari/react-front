import {
  GET_TECHS,
  ADD_TECH,
  SET_LOADING,
  SET_CURRENT,
  TECHS_ERROR
} from "../actions/types";

// set loading
export const setLoading = () => {
  return { type: SET_LOADING };
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
