export const API = Object.freeze({
    AVISOS: {
        GLOBAL: {
            consulta_exitosa: 'Consulta exitosa',
            error_consulta: 'Error al procesar la consulta'
        },
        USUARIOS: {
            BUSQUEDA: {
                consulta_exito: 'Consulta Exitosa'
            }
        },
        PARTIDAS: {
            AUDITORIA_FOTOGRAFIA: {
                registros_obtenidos: 'Registros cargados de forma correcta.',
                partida_encontrada: 'Registro de partida encontrado.',
                registro_no_encontrado: 'El registro de la partida no fue encontrado.',
                error_busqueda: 'Ocurrio un error al procesar la busqueda'
            }
        }
    },
    ENDPOINTS: {
        USUARIOS: {
            BUSQUEDA: { endpoint: 'https://jsonplaceholder.typicode.com/users' }
        },
        PARTIDAS: {
            AUDITORIA_FOTOGRAFIA: {
                BUSQUEDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/folio' },
                PAGINADO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria' }
            }
        }
    }
});
