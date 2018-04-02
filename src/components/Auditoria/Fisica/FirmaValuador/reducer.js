import { VALIDAR_USUARIO, OCULTAR_DETALLE } from './actions';

const initialState = {
	loadDetail: false
};

export function firmaValuador(state = initialState,action){
	switch(action.type){
		case VALIDAR_USUARIO:
			if(action.payload.code === '200'){
				return Object.assign({}, state, {loadDetail: true})
			}
			else{
				return state;
			}
		case OCULTAR_DETALLE:
			return Object.assign({}, state, {loadDetail: false})
		default:
			return state;
	}
}