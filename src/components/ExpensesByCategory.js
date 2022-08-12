import React from 'react'
import { Header, Title } from './../elements/Header'
import { Helmet } from 'react-helmet'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'
import useGetMonthExpenses from '../hooks/useGetMonthExpenses'
import useGetExpensesByCategory from '../hooks/useGetExpensesByCategory'
import {
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Valor,
} from './../elements/ElementsList.js'
import IconCategory from '../elements/IconCategory'
import convertToCurrency from './../functions/convertToCurrency'

const ExpensesByCategory = () => {
	const ExpensesByCategory = useGetExpensesByCategory()

	return (
		<>
			<Helmet>
				<title>Expenses By Category</title>
			</Helmet>
			<Header>
				<BtnBack />
				<Title>Expenses By Category</Title>
			</Header>
			<ListaDeCategorias>
				{ExpensesByCategory.map((element, index) => {
					return (
						<ElementoListaCategorias key={index}>
							<Categoria>
								<IconCategory id={element.category} /> {element.category}
							</Categoria>
							<Valor>{convertToCurrency(element.amount)}</Valor>
						</ElementoListaCategorias>
					)
				})}
			</ListaDeCategorias>
			<TotalSpentBar />
		</>
	)
}

export default ExpensesByCategory
