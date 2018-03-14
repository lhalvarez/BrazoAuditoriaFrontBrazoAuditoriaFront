const userData = {
	"token":"sadfdsafdsafsdfsadfsadfasdfsad",
	"detalleUsuario": {
		"correo": "email@fakesession.com",
		"nombreCompleto": "Sesión Inhabilitada",
		"sucursal": 0,
		"usuario": "fakeSession",
		"rol": 1
	}
};

const menu = [
	{
		"idMenu": 1,
		"descripcion": "Inicio",
		"url": "/",
		"ico": "fa-dashboard",
		"submenus": null
	},
	{
		"idMenu": 2,
		"descripcion": "Gestión de Partidas",
		"url": "#",
		"ico": "fa-check-square-o",
		"submenus": [
			{
				"idMenu": 3,
				"descripcion": "Física",
				"url": "#",
				"ico": "fa-file-excel-o",
				"submenus": [
					{
						"idMenu": 30,
						"descripcion": "Carga",
						"url": "/cargar-partidas-fisica",
						"ico": "fa-upload",
						"submenus": null
					},
					{
						"idMenu": 31,
						"descripcion": "Validación",
						"url": "/validacion-partidas-fisica",
						"ico": "fa-check",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 4,
				"descripcion": "Fotografía",
				"url": "#",
				"ico": "fa-camera",
				"submenus": [
					{
						"idMenu": 32,
						"descripcion": "Carga",
						"url": "/cargar-partidas-fotografia",
						"ico": "fa-upload",
						"submenus": null
					},
					{
						"idMenu": 33,
						"descripcion": "Validación",
						"url": "validacion-partidas-fotografia",
						"ico": "fa-check",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 5,
				"descripcion": "Consulta Salida",
				"url": "/salida-partidas",
				"ico": "fa-sign-out",
				"submenus": null
			}
		]
	},
	{
		"idMenu": 6,
		"descripcion": "Auditoría",
		"url": "#",
		"ico": "fa-eye",
		"submenus": [
			{
				"idMenu": 10,
				"descripcion": "Fotografía",
				"url": "/auditoria-fotografia",
				"ico": "fa-image",
				"submenus": null
			},
			{
				"idMenu": 7,
				"descripcion": "Física",
				"url": "#",
				"ico": "fa-file-o",
				"submenus": [
					{
						"idMenu": 8,
						"descripcion": "Caja Abierta",
						"url": "/auditoria-fisica-caja-abierta",
						"ico": "fa-dropbox",
						"submenus": null
					},
					{
						"idMenu": 9,
						"descripcion": "Caja Cerrada",
						"url": "/auditoria-fisica-caja-cerrada",
						"ico": "fa-inbox",
						"submenus": null
					}
				]
			}
		]
	},
	{
		"idMenu": 12,
		"descripcion": "Lista Usuarios",
		"url": "#",
		"ico": "fa-user",
		"submenus": [
			{
				"idMenu": 13,
				"descripcion": "Consulta Usuarios",
				"url": "/usuarios",
				"ico": "fa-users",
				"submenus": null
			}
		]
	}
];

export const fake = {
	userData,
	menu
};
