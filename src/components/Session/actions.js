/*
* Acciones relacionadas a la sesión
*/
import { API } from '../../constants';
import MessageService from '../../lib/utils/MessageService';

export const REDIRECCIONAR_LOGIN = 'REDIRECCIONAR_LOGIN';

export const INICIANDO_SESION = 'INICIANDO_SESION';
export const SESION_INICIADA = 'SESION_INICIADA';

export const CERRANDO_SESION = 'CERRANDO_SESION';
export const SESION_CERRADA = 'SESION_CERRADA';

export const VERIFICANDO_SESION = 'VERIFICANDO_SESION';
export const SESION_VERIFICADA = 'SESION_VERIFICADA';

export const ERROR_INICIO_SESION = 'ERROR_INICIO_SESION';
export const ERROR_CIERRE_SESION = 'ERROR_CIERRE_SESION';
export const ERROR_VERIFICACION_SESION = 'ERROR_VERIFICACION_SESION';

export const VERIFICANDO_MENU = 'VERIFICANDO_MENU';
export const MENU_VERIFICADO = 'MENU_VERIFICADO';
export const ERROR_VERIFICACION_MENU = 'ERROR_VERIFICACION_MENU';

export function redireccionarLogin(){
	return dispatch => {
		window.location = API.ENDPOINTS.LOGINNMP;
		dispatch({ type: REDIRECCIONAR_LOGIN });
	};
}

export function iniciarSesion(body){
	return dispatch => {
		dispatch({ type: INICIANDO_SESION });

		MessageService.save(API.ENDPOINTS.SEGURIDAD.INICIAR_SESION.endpoint,body)
		.then( response => {
			let userData = {
				usuario: response.object.usuario,
				token: response.object.token
			};

			sessionStorage.setItem('userData', JSON.stringify(userData));
			sessionStorage.setItem('menu',JSON.stringify(response.object.menu));

			dispatch({ 
				type: SESION_INICIADA,
				...userData
			});
		} )
		.catch(error => {
			dispatch({ type: ERROR_INICIO_SESION });

			window.location = API.ENDPOINTS.LOGINNMP;
			dispatch({ type: REDIRECCIONAR_LOGIN });
		});
	};
}

export function cerrarSesion(){
	return dispatch => {
		if(window.sessionStorage.userData === undefined){
			redirectLogin(dispatch);
			return false;
		}

		dispatch({ type: CERRANDO_SESION });

		try {
			var userData = JSON.parse(sessionStorage.getItem('userData'));
		} catch(e) {
			redirectLogin(dispatch);
		}

		sessionStorage.removeItem('userData');
		sessionStorage.removeItem('menu');

		MessageService.destroy(API.ENDPOINTS.SEGURIDAD.INICIAR_SESION.endpoint,userData.usuario)
		.then(
			response => {
				dispatch({ type: SESION_CERRADA });

				redirectLogin(dispatch);
			}
		)
		.catch(error => dispatch({ type: ERROR_CIERRE_SESION }));
	}

	function redirectLogin(dispatch){
		window.location = API.ENDPOINTS.LOGINNMP;
		dispatch({ type: REDIRECCIONAR_LOGIN });
	};
}

export function verificarSesion(){
	return dispatch => {
		if(window.sessionStorage.userData === undefined){
			redirectLogin(dispatch);
			return false;
		}

		try {
			var userData = JSON.parse(sessionStorage.getItem('userData'));
		} catch(e) {
			redirectLogin(dispatch);
			sessionStorage.removeItem('userData');
		}

		dispatch({ type: VERIFICANDO_SESION });

		MessageService.getAll(`${API.ENDPOINTS.SEGURIDAD.VERIFICAR_SESION.endpoint}/${userData.usuario}`)
		.then(response => {
			dispatch({ 
				type: SESION_VERIFICADA,
				usuario: userData.usuario,
				token: userData.token
			});
		})
		.catch(error => {
			dispatch({ type: ERROR_VERIFICACION_SESION });

			sessionStorage.removeItem('userData');

			redirectLogin(dispatch);
		});
	}

	function redirectLogin(dispatch){
		window.location = API.ENDPOINTS.LOGINNMP;
		dispatch({ type: REDIRECCIONAR_LOGIN });
	};
}

export function verificarMenu(){
	return dispatch => {
		dispatch({ type: VERIFICANDO_MENU });

		if(window.sessionStorage.menu === undefined){
			redirectLogin(dispatch);
			return false;
		}

		try {
			var menu = JSON.parse(sessionStorage.getItem('menu'));
		} catch(e) {
			redirectLogin(dispatch);
			sessionStorage.removeItem('userData');
			sessionStorage.removeItem('menu');
		}

		dispatch({ type: MENU_VERIFICADO, menu });
	};

	function redirectLogin(dispatch){
		dispatch({ type: ERROR_VERIFICACION_MENU });

		window.location = API.ENDPOINTS.LOGINNMP;
		dispatch({ type: REDIRECCIONAR_LOGIN });
	};
}