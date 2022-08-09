import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title } from './../elements/Header'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'
import useGetData from '../hooks/useGetData'
import {
	Lista,
	ElementoLista,
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Descripcion,
	Valor,
	Fecha,
	ContenedorBotones,
	BotonAccion,
	BotonCargarMas,
	ContenedorBotonCentral,
	ContenedorSubtitulo,
	Subtitulo,
} from './../elements/ElementsList'
import convertToCurrency from './../functions/convertToCurrency.js'
import IconCategory from './../elements/IconCategory'
import { ReactComponent as IconEdit } from './../img/editar.svg'
import { ReactComponent as IconDelete } from './../img/borrar.svg'
import { Link } from 'react-router-dom'
import Button from './../elements/Button'

const ExpensesList = () => {
	const [expenses, getMoreExpenses, moreExpenses] = useGetData()
	console.log(expenses)

	return (
		<>
			<Helmet>
				<title>Expenses List</title>
			</Helmet>
			<Header>
				<BtnBack />
				<Title>Expenses List</Title>
			</Header>

			<Lista>
				{expenses.map((expense) => {
					return (
						<ElementoLista key={expense.id}>
							<Categoria>
								<IconCategory id={expense.category} />
								{expense.category}
							</Categoria>
							<Descripcion>{expense.description}</Descripcion>
							<Valor>{convertToCurrency(expense.amount)}</Valor>
							<ContenedorBotones>
								<BotonAccion as={Link} to={`/edit/${expense.id}`}>
									<IconEdit />
								</BotonAccion>
								<BotonAccion>
									<IconDelete />
								</BotonAccion>
							</ContenedorBotones>
						</ElementoLista>
					)
				})}
				<ContenedorBotonCentral>
					<BotonCargarMas>Load More</BotonCargarMas>
				</ContenedorBotonCentral>
				{expenses.length === 0 && (
					<ContenedorSubtitulo>
						<Subtitulo>There are not expenses to show</Subtitulo>
						<Button as={Link} to='/'>
							Add Expense
						</Button>
					</ContenedorSubtitulo>
				)}
			</Lista>
			<TotalSpentBar />
		</>
	)
}

export default ExpensesList
