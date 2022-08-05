import React from 'react'
import { Header, Title, ContainerHeader, ContainerButtons } from './../elements/Header'
import { Helmet } from 'react-helmet'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'

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
