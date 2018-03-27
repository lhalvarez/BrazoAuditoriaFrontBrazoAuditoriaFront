export const CARGAR_DETALLE_PARTIDA= 'CARGAR_DETALLE_PARTIDA';

export function cargarDetallePartida(){
	return dispatch => dispatch({ type: CARGAR_DETALLE_PARTIDA })
}