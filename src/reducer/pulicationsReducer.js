// import {BRING_ALL,LOADING,ERROR} from '../types/usuariosTypes'
import {
  UPDATE_COMMENTS,
  UPDATE,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  ERROR_COMMENTS,
} from "../types/publicationsTypes";

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: "",
  commentsLoading: false,
  commentsError: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: "",
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_COMMENTS:
      return {
        ...state,
        publications: action.payload,
        commentsLoading: false,
        commentsError: "",
      };
    case LOADING_COMMENTS:
      return { ...state, commentsLoading: true };
    case ERROR_COMMENTS:
      return {
        ...state,
        commentsError: action.payload,
        commentsLoading: false,
      };
    default:
      return state;
  }
};
