import { CARGAR_DETALLE_PARTIDA } from './actions';

const initialState = {
	loadDetail: false
};

export function cajaAbierta(state = initialState,action){
	switch(action.type){
		case CARGAR_DETALLE_PARTIDA:
			return { ...state, loadDetail: true };
		default:
			return state;
	}
}