import { 
	CARGAR_DETALLE_PARTIDA,
	CARGANDO_DETALLE_PARTIDA,
	DETALLE_PARTIDA_CARGADA,
	ERROR_CARGAR_DETALLE_PARTIDA
} from './actions';

const initialState = {
	rfid: '',
	folio: '',
	loadDetail: false,
	partidaCargada: false
};

export function cajaAbierta(state = initialState,action){
	switch(action.type){
		case CARGAR_DETALLE_PARTIDA:
			return { ...state, loadDetail: true };
		case CARGANDO_DETALLE_PARTIDA:
			return {...initialState};
		case DETALLE_PARTIDA_CARGADA:
			return { 
				...state,
				rfid: action.rfid,
				folio: action.folio,
				partidaCargada: true,
				llavePartida: action.llavePartida,
				detallePartida: action.detallePartida,
				foto: action.foto,
				resultado: action.resultado
			};
		case ERROR_CARGAR_DETALLE_PARTIDA:
			return {...initialState};
		default:
			return state;
	}
}