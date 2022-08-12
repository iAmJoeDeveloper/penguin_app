import React, { useState, useEffect, useContext } from 'react'
import useGetMonthExpenses from './../hooks/useGetMonthExpenses'

const TotalGastadoContext = React.createContext()

const useTotalDelMes = () => useContext(TotalGastadoContext)

const TotalSpentProvider = ({ children }) => {
	const [total, setTotal] = useState(0)
	const expenses = useGetMonthExpenses()

	useEffect(() => {
		let acumulado = parseInt(0)
		expenses.forEach((expense) => {
			acumulado += parseInt(expense.amount)
		})

		setTotal(acumulado)
	}, [expenses])

	return (
		<TotalGastadoContext.Provider value={{ total: total }}>{children}</TotalGastadoContext.Provider>
	)
}

export { TotalSpentProvider, useTotalDelMes }
