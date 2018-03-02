const userData = {"usuario":"UsuarioFalso","token":"sadfdsafdsafsdfsadfsadfasdfsad"};

const menu = [
	{
		"idMenu": 1,
		"descripcion": "Inicio",
		"url": "/",
		"ico": "ico",
		"submenus": null
	},
	{
		"idMenu": 2,
		"descripcion": "Gestión de Partidas",
		"url": "#",
		"ico": "ico",
		"submenus": [
			{
				"idMenu": 3,
				"descripcion": "Física",
				"url": "#",
				"ico": "ico",
				"submenus": [
					{
						"idMenu": 30,
						"descripcion": "Carga",
						"url": "#",
						"ico": "ico",
						"submenus": null
					},
					{
						"idMenu": 31,
						"descripcion": "Validación",
						"url": "#",
						"ico": "ico",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 4,
				"descripcion": "Fotografía",
				"url": "#",
				"ico": "ico",
				"submenus": [
					{
						"idMenu": 32,
						"descripcion": "Carga",
						"url": "#",
						"ico": "ico",
						"submenus": null
					},
					{
						"idMenu": 33,
						"descripcion": "Validación",
						"url": "#",
						"ico": "ico",
						"submenus": null
					}
				]
			},
			{
				"idMenu": 5,
				"descripcion": "Consulta Salida",
				"url": "#",
				"ico": "ico",
				"submenus": null
			}
		]
	},
	{
		"idMenu": 6,
		"descripcion": "Auditoría",
		"url": "#",
		"ico": "ico",
		"submenus": [
			{
				"idMenu": 10,
				"descripcion": "Fotografía",
				"url": "/auditoria-fotografia",
				"ico": "ico",
				"submenus": null
			},
			{
				"idMenu": 7,
				"descripcion": "Física",
				"url": "#",
				"ico": "ico",
				"submenus": [
					{
						"idMenu": 8,
						"descripcion": "Caja Abierta",
						"url": "/auditoria-fisica-caja-abierta",
						"ico": "ico",
						"submenus": [
							{
								"idMenu": 14,
								"descripcion": "Bisnieto",
								"url": "#",
								"ico": "ico",
								"submenus": null
							}
						]
					},
					{
						"idMenu": 9,
						"descripcion": "Caja Cerrada",
						"url": "/auditoria-fisica-caja-cerrada",
						"ico": "ico",
						"submenus": [
							{
								"idMenu": 15,
								"descripcion": "Bisnieto 2",
								"url": "/usuarios",
								"ico": "ico",
								"submenus": null
							}
						]
					}
				]
			}
		]
	},
	{
		"idMenu": 12,
		"descripcion": "Lista Usuarios",
		"url": "#",
		"ico": "ico",
		"submenus": [
			{
				"idMenu": 13,
				"descripcion": "Consulta Usuarios",
				"url": "/usuarios",
				"ico": "ico",
				"submenus": null
			}
		]
	}
];

export const fake = {
	userData,
	menu
};