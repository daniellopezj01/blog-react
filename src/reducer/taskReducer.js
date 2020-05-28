import { BRING_ALL_TASKS, LOADING, ERROR,CHANGE_USER_ID,CHANGE_TITLE,SAVE_TASK ,UPDATE_TASK} from "../types/tasksTypes";

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: "",
  user_id: '',
  title: '',
  become:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BRING_ALL_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: "",become:false};
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case CHANGE_USER_ID:
		return { ...state, user_id:action.payload};
    case CHANGE_TITLE:
		return { ...state, title:action.payload};
    case SAVE_TASK:
		return { ...state, tasks:{},loading:false,error:"",become:true, title:'', user_id:''};
    case UPDATE_TASK:
		return { ...state, tasks:action.payload};
    default:
      return state;
  }
};
