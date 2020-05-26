import axios from "axios";
import {
  UPDATE_COMMENTS,
  UPDATE,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  ERROR_COMMENTS,
} from "../types/publicationsTypes";
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

    const news = res.data.map((publication) => ({
      ...publication,
      comments: [],
      open: false,
    }));

    const update_publications = [...publications, news];

    dispatch({
      type: UPDATE,
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
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "publications not available ",
    });
  }
};

export const openClose = (pub_key, com_key) => (dispatch, getState) => {
  const { publications } = getState().publicationsReducer;
  const selected = publications[pub_key][com_key];
  const updated = {
    ...selected,
    isOpen: !selected.isOpen,
  };
  const updatedPublications = [...publications];
  updatedPublications[pub_key] = [...publications[pub_key]];
  console.log(pub_key, com_key);
  updatedPublications[pub_key][com_key] = updated;
  dispatch({
    type: UPDATE,
    payload: updatedPublications,
  });
};

export const bringComments = (pub_key, com_key) => async (
  dispatch,
  getState
) => {
 dispatch({
   type:LOADING_COMMENTS
 })
  const { publications } = getState().publicationsReducer;
  const selected = publications[pub_key][com_key];
  try {
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
    );
    const updated = {
      ...selected,
      comments: res.data,
    };
    const updatedPublications = [...publications];
    updatedPublications[pub_key] = [...publications[pub_key]];
    updatedPublications[pub_key][com_key] = updated;
    dispatch({
      type: UPDATE_COMMENTS,
      payload: updatedPublications,
    });
  } catch (error) {
    console.log(error.message)
    dispatch({
      type:ERROR_COMMENTS,
      payload:"Comentarios no disponibles."
    })
  }
};
