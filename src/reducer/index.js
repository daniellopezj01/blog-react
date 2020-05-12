import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import publicationsReducer from "./pulicationsReducer";
export default combineReducers({
  usuariosReducer,
  publicationsReducer
});
  