import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title } from './../elements/Header'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'

const ExpensesList = () => {
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
