const userData = {
	"token":"sadfdsafdsafsdfsadfsadfasdfsad",
	"detalleUsuario": {
		"correo": "rarce@montepiedad.com.mx",
		"nombreCompleto": "ARCE DOCTOR RODOLFO ALEJANDRO",
		"sucursal": 303,
		"usuario": "rarce",
		"rol": 1
	}
};

const menu = [
	{
		"idMenu": 1,
		"descripcion": "Inicio",
		"url": "/",
		"ico": "fa fa-fw fa-tachometer-alt",
		"submenus": null
	},
	{
		"idMenu": 2,
		"descripcion": "Gestión de Partidas",
		"url": "#",
		"ico": "fa fa-fw fa-check-square",
		"submenus": [
			{
				"idMenu": 3,
				"descripcion": "Física",
				"url": "#",
				"ico": "fa fa-fw fa-file-excel",
				"submenus": [
					{
						"idMenu": 30,
						"descripcion": "Carga",
						"url": "/cargar-partidas-fisica",
						"ico": "fa fa-fw fa-upload",
						"submenus": null
					},
					{
						"idMenu": 31,
						"descripcion": "Validación",
						"url": "/validacion-partidas-fisica",
						"ico": "fa fa-fw fa-check",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 4,
				"descripcion": "Fotografía",
				"url": "#",
				"ico": "fa fa-fw fa-camera",
				"submenus": [
					{
						"idMenu": 32,
						"descripcion": "Carga",
						"url": "/cargar-partidas-fotografia",
						"ico": "fa fa-fw fa-upload",
						"submenus": null
					},
					{
						"idMenu": 33,
						"descripcion": "Validación",
						"url": "validacion-partidas-fotografia",
						"ico": "fa fa-fw fa-check",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 5,
				"descripcion": "Consulta Salida",
				"url": "/salida-partidas",
				"ico": "fa fa-fw fa-sign-out-alt",
				"submenus": null
			}
		]
	},
	{
		"idMenu": 6,
		"descripcion": "Auditoría",
		"url": "#",
		"ico": "fa fa-fw fa-eye",
		"submenus": [
			{
				"idMenu": 10,
				"descripcion": "Fotografía",
				"url": "/auditoria-fotografia",
				"ico": "fa fa-fw fa-image",
				"submenus": null
			},
			{
				"idMenu": 7,
				"descripcion": "Física",
				"url": "#",
				"ico": "fa fa-fw fa-file-signature",
				"submenus": [
					{
						"idMenu": 8,
						"descripcion": "Caja Abierta",
						"url": "/auditoria-fisica-caja-abierta",
						"ico": "fab fa-dropbox",
						"submenus": null
					},
					{
						"idMenu": 9,
						"descripcion": "Caja Cerrada",
						"url": "/auditoria-fisica-caja-cerrada",
						"ico": "fa fa-fw fa-inbox",
						"submenus": null
					}
				]
			}
		]
	},
  {
    "idMenu": 34,
    "descripcion": "Reportes",
    "url": "/reportes",
    "ico": "fa fa-fw fa-chart-bar",
    "submenus": null
  }
];

export const fake = {
	userData,
	menu
};
