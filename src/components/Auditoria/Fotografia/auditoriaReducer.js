import {PAGINAR_PARTIDAS, BUSQUEDA_PARTIDAS, PAGINAR_AUDITORIAS, BUSQUEDA_AUDITORIAS} from "./actions";

const initialState = {
    list: [],
    total: 0
};

export function auditoriaReducer(state = initialState, action) {
    let result = null;

    switch (action.type) {
        case PAGINAR_PARTIDAS:
            result = action.payload ? { list: action.payload.object.contenido,
                                        total: action.payload.object.totalElementos } : initialState;
            return Object.assign({}, state, result);
        case BUSQUEDA_PARTIDAS:
            result = action.payload ? [{ folio: action.payload.object.llavePartida.folio,
                                         sucursal: action.payload.object.detallePartida.sucursal }] : [];
            return Object.assign({}, state, {
                list: result,
                total: action.payload ? result.length : initialState.total
            });
        case PAGINAR_AUDITORIAS:
            result = action.payload ? { list: action.payload.object.contenido, // todo: verificar en que estructura llegara el contenido del paginado
                                        total: action.payload.object.totalElementos } : initialState;
            return Object.assign({}, state, result);
        case BUSQUEDA_AUDITORIAS:
            if(!action.payload){
              return state;
            }

            let nombreArchivo = ('carga' in action.payload.object) ? action.payload.object.carga.nombreArchivo : action.payload.object.nombreArchivo;

            result = action.payload ? [{
                id: action.payload.object.id,
              numeroPartidas: action.payload.object.numeroPartidas,
                nombreArchivo
            }] : [];
            return Object.assign({}, state, {
              list: result,
              total: action.payload ? result.length : initialState.total
            });
        default:
            return state;
    }
}
