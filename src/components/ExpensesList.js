import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title } from './../elements/Header'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'
import useGetData from '../hooks/useGetData'

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
			<TotalSpentBar />
		</>
	)
}

export default ExpensesList
