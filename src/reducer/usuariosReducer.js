import {BRING_ALL,LOADING,ERROR} from '../types/usuariosTypes'

const INITIAL_STATE = {
	usuarios: [],
	loading:false,
	error:''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case BRING_ALL:
			return { ...state, usuarios: action.payload,loading:false, error:''};
		case LOADING:
			return { ...state, loading: true };
		case ERROR:
			return { ...state, error: action.payload, loading:false };
		default: return state;
	};
};