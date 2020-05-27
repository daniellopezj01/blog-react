import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import publicationsReducer from "./pulicationsReducer";
import taskReducer from "./taskReducer";
export default combineReducers({
  usuariosReducer,
  publicationsReducer,
  taskReducer
});