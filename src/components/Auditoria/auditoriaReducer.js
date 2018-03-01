import { PAGINAR_PARTIDAS, BUSQUEDA_PARTIDAS } from "./actions";

const initialState = {
    list: [],
    total: 0
};

export function auditoriaReducer(state = initialState, action) {
    switch (action.type) {
        case PAGINAR_PARTIDAS:
            return Object.assign({}, state, {
                list: action.payload.object.contenido,
                total: action.payload.object.totalElementos
            });
        case BUSQUEDA_PARTIDAS:
            return Object.assign({}, state, {
                list: [{ folio: action.payload.object.llavePartida.folio,
                         sucursal: action.payload.object.detallePartida.sucursal }],
                total: initialState.total
            });
        default:
            return state;
    }
}
