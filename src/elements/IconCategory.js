import React from 'react'
import { ReactComponent as IconFood } from './../img/cat_comida.svg'
import { ReactComponent as IconShopping } from './../img/cat_compras.svg'
import { ReactComponent as IconCuentasYPagos } from './../img/cat_cuentas-y-pagos.svg'
import { ReactComponent as IconDiversion } from './../img/cat_diversion.svg'
import { ReactComponent as IconHome } from './../img/cat_hogar.svg'
import { ReactComponent as IconClothes } from './../img/cat_ropa.svg'
import { ReactComponent as IconSaludEHigiene } from './../img/cat_salud-e-higiene.svg'
import { ReactComponent as IconTransporte } from './../img/cat_transporte.svg'

const IconCategory = ({ id }) => {
	switch (id) {
		case 'comida':
			return <IconFood />
		case 'compras':
			return <IconShopping />
		case 'cuentas y pagos':
			return <IconCuentasYPagos />
		case 'diversion':
			return <IconDiversion />
		case 'hogar':
			return <IconHome />
		case 'ropa':
			return <IconClothes />
		case 'salud e higiene':
			return <IconSaludEHigiene />
		case 'transporte':
			return <IconTransporte />
		default:
			break
	}
}

export default IconCategory
