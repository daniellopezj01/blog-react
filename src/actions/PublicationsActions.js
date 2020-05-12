import axios from "axios";
import { BRING_ALL_FOR_USER, LOADING, ERROR } from "../types/publicationsTypes";
import * as usuariosTypes from '../types/usuariosTypes'
const { BRING_ALL } = usuariosTypes;

export const bringForUser = (key) => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const { publications } = getState().publicationsReducer;
  const user_id = usuarios[key].id;
  const res = await axios.get(
    `http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
  );
  const update_publications = [...publications, res.data];

  const publications_key =  update_publications.length-1;
  const update_users =  [...usuarios]
  console.log(publications_key)
  update_users[key]= {...usuarios[key],publications_key}

  dispatch({
    type:BRING_ALL,
    payload: update_users
  });
  
  dispatch({
    type: BRING_ALL_FOR_USER,
    payload: update_publications,
  });
};
