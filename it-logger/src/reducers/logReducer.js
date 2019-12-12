// action types
import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS
} from "../actions/types";

// logs initial state
const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null
};

// export reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return { ...state, loading: false, logs: action.payload };

    case ADD_LOG:
      return {
        ...state,
        loading: false,
        logs: [action.payload, ...state.logs]
      };

    case DELETE_LOG:
      return {
        ...state,
        loading: false,
        logs: state.logs.filter(log => log.id !== action.payload)
      };

    case UPDATE_LOG:
      return {
        ...state,
        loading: false,
        logs: state.logs.map(log =>
          log.id === action.payload.id ? action.payload : log
        )
      };

    case SEARCH_LOGS:
      return { ...state, loading: false, logs: action.payload };

    case SET_LOADING:
      return { ...state, loading: true };

    case LOGS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case CLEAR_CURRENT:
      return { ...state, current: null };

    default:
      return state;
  }
};
