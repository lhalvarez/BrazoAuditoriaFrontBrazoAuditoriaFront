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
        GESTION: {
            SALIDA: {
                BUSQUEDA: {
                    TITULO: 'Ejecutar Salida',
                    CORRECTO: 'Se ejecutó correctamente el marcado de la partida',
                    NO_DISPONIBLE: 'Servicio temporalmente no disponible',
                    NMP_AUD_0003: 'La partida especificada no existe',
                    NMP_AUD_9999: 'Ocurrió un error al ejecutar la salida de la partida'
                },
                LISTA: {
                    TITULO: 'Actualizar Lista Partidas',
                    CORRECTO: 'La lista de partidas se actualizo correctamente',
                    VACIO: 'No se encontraron partidas pendientes de salida',
                    NO_DISPONIBLE: 'Servicio temporalmente no disponible',
                    NMP_AUD_9999: 'Ocurrió un error al actualizar la lista de partidas'
                }
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
        GESTION: {
            SALIDA: {
                BUSQUEDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/:rfid/:folio/salida' },
                PAGINADO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/salida' },
                EXPORTAR: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/salida/pdf' }
            }
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
                },
                CARGAR_FOTOGRAFIA: { endpoint: '/api/fotografia' }
            },
            FISICA: {
                CAJA_ABIERTA: {
                    DETALLE_PARTIDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/' }
                },
                CAJA_CERRADA: {
                  DETALLE_PARTIDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/' }
                }
            },
            RESULTADO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/resultado/' }
        },
        SEGURIDAD: {
            INICIAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' },
            VERIFICAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' },
            CERRAR_SESION: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/' },
            VALIDAR_USUARIO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seguridad/credenciales' }
        },
        DASHBOARD: {
            RESUMEN_PENDIENTES: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/dashboard' }
        },
        LOGINNMP: 'https://iamdr.montepiedad.com.mx:4446/loginNMP/?contextType=external&username=string&password=secure_string&challenge_url=https%3A%2F%2Fiamdr.montepiedad.com.mx%3A4446%2FloginNMP&request_id=418267511198979006&authn_try_count=0&locale=es_ES&resource_url=https%253A%252F%252Fiamdr.montepiedad.com.mx%253A4446%252Fms_oauth%252Foauth2%252Fui%252Fbmservice%252Fshowconsent%253Fresponse_type%25253Dcode%252526client_id%25253Dbmclient%252526redirect_uri%25253Dhttps%25253A%25252F%25252Fdev1775-auditoriafront.mybluemix.net%25252Fingreso%252526scope%25253DBMUserProfile.me%252526state%25253Dgetauthz%252526oracle_client_name%25253DBrazoMecanicoClient',
        PARTIDAS: {
            LEER_DOCUMENTO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/nombreArchivo' },
            CARGAR_DOCUMENTO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/cargarArchivo' },

            LEER_AUDITORIAS: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/pendientesaut/' },
            LEER_AUDITORIA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/carga/' },
            CARGAR_AUDITORIA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/crear/' },
            AUDITORIA_PENDIENTE: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/pendientesaut' },
            VALIDAR_AUDITORIA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/autorizacion' },

            DETALLE:{
              DETALLE_PARTIDA: {endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/partida/folio/'}
            }

        },
        CATALOGOS: {
            BUSCAR_CATALOGO: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/catalogo' },
            SECCION_AYUDA: { endpoint: 'https://dev1775-auditoria.mybluemix.net/auditoria/seccionayuda/:nombreSeccion' }
        }
    }
});

/* Tiempo para verificar la sesión, y tiempo transcurrido para eliminar la sesión */
export const NUMERICAS = Object.freeze({
    VERIFICAR_SESION: 300000,
    CERRAR_SESION: 1800000,
    GESTION: {
        SALIDA: {
            TABLE_PAGE_SIZE: 5,
            AUTO_ACTUALIZAR: 10000
        }
    }
});

/* Habilitar o inhabilitar la seguridad con sesión */
export const CONFIG = Object.freeze({
    ENABLE_SESSION: false
});

/* Titulos de las paginas parametrizados mediante componente <ContainerTitle /> */
export const TITLES = Object.freeze({
    GESTION: {
        SALIDA: {
            TITULO: 'Salida de Prendas del depósito por Auditoría',
            BUSQUEDA: {
              LEYENDA: 'Criterios de Búsqueda',
              EJEC_SALIDA: 'Ejecutar salida',
              NUM_CAJA: 'Número de Caja',
              NUM_PARTIDA: 'Número de Partida',
              RFID: 'Rfid',
              FOLIO: 'Folio'
            },
            LISTA: {
              LEYENDA: 'Pendientes de salida:',
              ACTUALIZAR: 'Actualizar',
              IMPRIMIR_LIST: 'Imprimir Lista',
              AUTOMATICO: 'Automático',
              TABLA: {
                ANTERIOR: 'Anterior',
                SIGUIENTE: 'Siguiente',
                PAGINA: 'Página',
                DE: 'de',
                FILAS: 'Filas',
                SIN_DATOS: 'No existen partidas pendientes de salida',
                CARGANDO: 'Actualizando...'
              }
            }
        }
    },
    AUDITORIA: {
        FOTOGRAFIA: {
            INFO_AUDITORIA: 'Información Auditoría por Fotografía',
            PARTIDAS_AUDITORIA: 'Partidas para Auditoría :idAuditoria cargada en archivo :archivo',
            PARTIDAS_DETALLES: 'Detalle de partida :idPartida'
        },
        FISICA: {
            CAJA_ABIERTA: {
                BUSQUEDA_PARTIDA: 'Validación de prendas del depósito Automatizado por Auditoría Caja Abierta',
                DETALLE_PARTIDA: 'Detalle de la Partida'
            },
            CAJA_CERRADA: {
                BUSQUEDA_PARTIDA: 'Validación de prendas del depósito Automatizado por Auditoría Caja Cerrada',
                DETALLE_PARTIDA: 'Detalle de Partida'
            }
        }
    },
    CONFIGURACION: {
        PRINCIPAL: 'Configuración General del Sistema'
    },
    INICIO: {
        PAGINA_INICIO: 'Bienvenido '
    }
});

/* Nombres de los catálogos disponibles */
export const CATALOGOS = Object.freeze({
    OBSERVACION: 'tipo_observacion'
});

/* Nombres de los catálogos disponibles */
export const LEYENDAS = Object.freeze({
    CARGA: {
        DD_VACIO: 'Arrastre y suelte su archivo en esta área',
        TAMANO_ARCHIVO: 'El archivo debe tener menos de',
        TAMANO_NUMERO: 2000, //2 MB,
        TAMANO_MB: '2 MB',
        ERROR_ARCHIVO: 'Error en el archivo',
        FORMATO_ARCHIVO: '.csv',
        FORMATO_ARCHIVO_LEYENDA: 'El archivo debe de ser en formato',
        ERROR_ENVIAR_DOC: 'Error al enviar documento',
        ERROR_DOCUMENTO_VALIDO: 'Debe cargar un documento válido',
        ERROR_SELECT_AUDIT: 'Debe seleccionar un tipo de auditoría física',
        ESPERA_REVISION: 'En espera de revisión',
        CARGANDO: 'Cargando...'


    }
});

/* Nombres de los catálogos disponibles */
export const TIPOS_VALIDACION = Object.freeze({
    VALIDACION_FOTOGRAFIA: 1,
    VALIDACION_FISICA: 2
});
