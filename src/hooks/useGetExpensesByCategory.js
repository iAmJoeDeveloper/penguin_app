import { useEffect, useState } from 'react'
import useGetMonthExpenses from './useGetMonthExpenses'

const useGetExpensesByCategory = () => {
	const [ExpensesByCategory, setExpensesByCategory] = useState([])
	const expenses = useGetMonthExpenses()

	useEffect(() => {
		const sumExpenses = expenses.reduce(
			(objectoResultante, objetoActual) => {
				const currentCategory = objetoActual.category
				const cantidadActual = objetoActual.amount

				objectoResultante[currentCategory] += parseInt(cantidadActual)

				return objectoResultante
			},
			{
				comida: 0,
				'cuentas y pagos': 0,
				hogar: 0,
				transporte: 0,
				ropa: 0,
				'salud e higiene': 0,
				compras: 0,
				diversion: 0,
			}
		)

		setExpensesByCategory(
			Object.keys(sumExpenses).map((elemento) => {
				return { category: elemento, amount: sumExpenses[elemento] }
			})
		)
	}, [expenses, setExpensesByCategory])

	return ExpensesByCategory
}

export default useGetExpensesByCategory
