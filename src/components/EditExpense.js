import React from 'react'
import { Header, Title } from './../elements/Header'
import { Helmet } from 'react-helmet'
import BtnBack from '../elements/BtnBack'
import TotalSpentBar from './TotalSpentBar'
import ExpenseForm from './ExpenseForm'
import { useParams } from 'react-router-dom'
import useGetExpense from '../hooks/useGetExpense'

const EditExpense = () => {
	const { id } = useParams()
	const [expense] = useGetExpense(id)

	return (
		<>
			<Helmet>
				<title>Edit Expense</title>
			</Helmet>
			<Header>
				<BtnBack ruta='/list' />
				<Title>Edit Expense</Title>
			</Header>

			<ExpenseForm expense={expense} />

			<TotalSpentBar />
		</>
	)
}

export default EditExpense
