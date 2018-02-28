import { PAGINAR_PARTIDAS, BUSQUEDA_PARTIDAS } from "./actions";

const initialState = {
    list: [],
    page: 0,
    pageSize: 10,
    total: 0
};

export function auditoriaReducer(state = initialState, action) {
    switch (action.type) {
        case PAGINAR_PARTIDAS:
            return Object.assign({}, state, {
                list: action.payload.object.content,
                page: action.payload.object.number,
                pageSize: action.payload.object.size,
                total: action.payload.object.totalElements
            });
        case BUSQUEDA_PARTIDAS:
            return Object.assign({}, state, {
                list: [action.payload.object],
                page: initialState.page,
                pageSize: initialState.pageSize,
                total: initialState.total
            });
        default:
            return state;
    }
}
