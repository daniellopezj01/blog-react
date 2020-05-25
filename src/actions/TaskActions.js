import axios from "axios";
import {
  BRING_ALL_TASKS,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  ADD_TASK,
} from "../types/tasksTypes";
export const bringAllTasks = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tasks = {};
    respuesta.data.map(
      (a) => (tasks[a.userId] = { ...tasks[a.userId], [a.id]: { ...a } })
    );
    dispatch({
      type: BRING_ALL_TASKS,
      payload: tasks,
    });
  } catch (error) {
    console.log("error", error.message);
    dispatch({
      type: ERROR,
      payload: "information tasks not available.",
    });
  }
};

export const changeUserId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: usuario_id,
  });
};

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title,
  });
};

export const add = (newTask) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const res = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      newTask
    );
    dispatch({
      type: ADD_TASK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente mas tarde...",
    });
  }
};
