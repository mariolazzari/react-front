import {
  GET_TECHS,
  ADD_TECH,
  SET_LOADING,
  SET_CURRENT,
  TECHS_ERROR,
  DELETE_TECH
} from "../actions/types";

const initialState = {
  techs: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return { ...state, loading: false, techs: action.payload };

    case SET_LOADING:
      return { ...state, loading: true };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case TECHS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ADD_TECH:
      return {
        ...state,
        loading: false,
        techs: [action.payload, ...state.techs]
      };

    case DELETE_TECH:
      return {
        ...state,
        loading: false,
        techs: state.techs.filter(tech => tech.id !== action.payload)
      };

    default:
      return state;
  }
};
