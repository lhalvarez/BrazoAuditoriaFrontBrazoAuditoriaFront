import { VALIDAR_USUARIO, OCULTAR_DETALLE } from './actions';

const initialState = {
	valuador: '',
    clave: '',
	loadDetail: false
};

export function firmaValuador(state = initialState,action){
	switch(action.type){
		case VALIDAR_USUARIO:
			if(action.payload.code === '200'){
				return Object.assign({}, state, {valuador: '', clave: '', loadDetail: true})
			}
			else{
				return state;
			}
		case OCULTAR_DETALLE:
			return Object.assign({}, state, {valuador: '', clave: '', loadDetail: false})
		default:
			return state;
	}
}