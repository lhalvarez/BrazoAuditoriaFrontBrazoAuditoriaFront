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
                auditoria_encontrada: 'Registro de auditoría encontrado.',
                registro_no_encontrado: 'El registro no fue encontrado.',
                error_busqueda: 'Ocurrio un error al procesar la busqueda'
            }
        }
    },
    ENDPOINTS: {
        USUARIOS: {
            BUSQUEDA: { endpoint: 'https://jsonplaceholder.typicode.com/users' }
        },
        AUDITORIA: {
            FOTOGRAFIA: {
                PARTIDAS: {
                    BUSQUEDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/:idAuditoria/partida/folio' },
                    PAGINADO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/:idAuditoria/partida' }
                },
                AUDITORIAS: {
                    BUSQUEDA: {
                        ID: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria' },
                        ARCHIVO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/nombreArchivo' },
                        AUTO_COMPLETE: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/autocomplete/nombreArchivo' }
                    },
                    PAGINADO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/cargas/completas' }
                }
            }
        },
        SEGURIDAD: {
            INICIAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' },
            VERIFICAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' },
            CERRAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' }
        },
        LOGINNMP: 'https://iamdr.montepiedad.com.mx:4446/loginNMP/?contextType=external&username=string&password=secure_string&challenge_url=https%3A%2F%2Fiamdr.montepiedad.com.mx%3A4446%2FloginNMP&request_id=418267511198979006&authn_try_count=0&locale=es_ES&resource_url=https%253A%252F%252Fiamdr.montepiedad.com.mx%253A4446%252Fms_oauth%252Foauth2%252Fui%252Fbmservice%252Fshowconsent%253Fresponse_type%25253Dcode%252526client_id%25253Dbmclient%252526redirect_uri%25253Dhttps%25253A%25252F%25252Fdev1775-auditoriafront.mybluemix.net%25252Fingreso%252526scope%25253DBMUserProfile.me%252526state%25253Dgetauthz%252526oracle_client_name%25253DBrazoMecanicoClient',
        PARTIDAS:{
          LEER_DOCUMENTO:{endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/nombreArchivo'},
          CARGAR_DOCUMENTO:{ endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/cargarArchivo' },

          LEER_AUDITORIAS:{ endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/pendientesaut/' },
          LEER_AUDITORIA:{ endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/' },
          CARGAR_AUDITORIA:{ endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/crear/' },


        }
    }
});

/* Tiempo para verificar la sesión, y tiempo transcurrido para eliminar la sesión */
export const NUMERICAS = Object.freeze({
    VERIFICAR_SESION: 300000,
    CERRAR_SESION: 1800000
});

/* Habilitar o inhabilitar la seguridad con sesión */
export const CONFIG = Object.freeze({
    ENABLE_SESSION: false
});

/* Titulos de las paginas parametrizados mediante componente <ContainerTitle /> */
export const TITLES = Object.freeze({
    AUDITORIA: {
        FOTOGRAFIA: {
            INFO_AUDITORIA: 'Información Auditoría por Fotografía',
            PARTIDAS_AUDITORIA: 'Partidas para Auditoría :idAuditoria cargada en archivo :archivo',
            PARTIDAS_DETALLES: 'Detalle de partida :idPartida'
        },
        FISICA: {
            CAJA_ABIERTA: {
                BUSQUEDA_PARTIDA: 'Validación de prendas del depósito Automatizado por Auditoría Caja Abierta',
                DETALLE_PARTIDA: 'Detalle de Partida'
            }
        }
    },
    INICIO:{
        PAGINA_INICIO: 'Bienvenido '
    }
});
