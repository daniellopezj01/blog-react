import axios from "axios";
import { BRING_ALL_FOR_USER, LOADING, ERROR } from "../types/publicationsTypes";
import * as usuariosTypes from "../types/usuariosTypes";
const { BRING_ALL } = usuariosTypes;
/**
 *
 * @param {*asdasdsd} key
 */
export const bringForUser = (key) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });
  const { usuarios } = getState().usuariosReducer;
  const { publications } = getState().publicationsReducer;
  const user_id = usuarios[key].id;
  try {
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    );
    const update_publications = [...publications, res.data];

    dispatch({
      type: BRING_ALL_FOR_USER,
      payload: update_publications,
    });

    const publications_key = update_publications.length - 1;
    const update_users = [...usuarios];
    update_users[key] = { ...usuarios[key], publications_key };
    dispatch({
      type: BRING_ALL,
      payload: update_users,
    });
  } catch (error) {
    console.log(error.message)
    dispatch({
      type:ERROR,
      payload:"publications not available "
    })
  }
};
