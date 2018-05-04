/*
* Archivo donde se colocará la ayuda de acuerdo a la ruta solicitada
*/

import React from 'react';
import hlp_home from '../HelpPane/seccion/hlp_home'


export const helpContent = {
	'/': (<hlp_home/>),
	'/auditoria-fisica-caja-abierta': (<div>Ayuda de la sección Auditoría Física Caja Abierta</div>),
};
