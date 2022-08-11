import React from 'react'
import { Header, Title } from './../elements/Header'
import { Helmet } from 'react-helmet'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'
import useGetMonthExpenses from '../hooks/useGetMonthExpenses'

const ExpensesByCategory = () => {
	return (
		<>
			<Helmet>
				<title>Expenses By Category</title>
			</Helmet>
			<Header>
				<BtnBack />
				<Title>Expenses By Category</Title>
			</Header>
			<TotalSpentBar />
		</>
	)
}

export default ExpensesByCategory
