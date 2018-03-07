import { 
	REDIRECCIONAR_LOGIN,

	INICIANDO_SESION,
	SESION_INICIADA,

	CERRANDO_SESION,
	SESION_CERRADA,

	ERROR_INICIO_SESION,
	ERROR_CIERRE_SESION,
	ERROR_VERIFICACION_SESION,

	VERIFICANDO_SESION,
	SESION_VERIFICADA,

	VERIFICANDO_MENU,
	MENU_VERIFICADO,
	ERROR_VERIFICACION_MENU
} from './actions';

const initialState = {
	token: '',
	detalleUsuario: {
		correo: '',
		nombreCompleto: '',
		sucursal: 0,
		usuario: '',
		rol: 1
	},
	activeSession: false
};

export function sessionReducer(state = initialState, action){
	switch (action.type) {
		case REDIRECCIONAR_LOGIN:
			return Object.assign({},state,{ activeSession: false })
		case INICIANDO_SESION:
			return Object.assign({},state,{ activeSession: false })
		case SESION_INICIADA: 
			return Object.assign({},state,{ 
				token: action.token,
				detalleUsuario: action.detalleUsuario,
				activeSession: true
			})
		case CERRANDO_SESION:
			return Object.assign({},state,{ activeSession: false })
		case SESION_CERRADA:
			return Object.assign({},state,{ activeSession: false })
		case ERROR_INICIO_SESION:
			return Object.assign({},state,{ activeSession: false })
		case VERIFICANDO_SESION:
			return Object.assign({},state,{ activeSession: true })
		case SESION_VERIFICADA:
			return Object.assign({},state,{ 
				token: action.token,
				detalleUsuario: action.detalleUsuario,
				activeSession: true
			})
		case ERROR_VERIFICACION_SESION:
			return Object.assign({},state,{ activeSession: false })
		case VERIFICANDO_MENU:
			return Object.assign({},state,{ verifiedMenu: false })
		case MENU_VERIFICADO:
			return Object.assign({},state,{ 
				verifiedMenu: true,
				menu: action.menu
			})
		case ERROR_VERIFICACION_MENU:
			return Object.assign({},state,{ verifiedMenu: false })
		default:
			return state
	}
};