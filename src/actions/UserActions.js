import axios from "axios";
import { BRING_ALL, LOADING, ERROR } from "../types/usuariosTypes";
export const bringAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: BRING_ALL,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log("error", error.message);
    dispatch({
      type: ERROR,
      payload: "Upsss ocurrio un error, intente mas tarde.",
    });
  }
};
