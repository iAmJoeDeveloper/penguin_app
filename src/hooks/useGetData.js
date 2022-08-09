import { useState, useEffect } from 'react'
import { db } from './../firebase/firebaseconfig'
import { useAuth } from './../context/AuthContext'
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	where,
	limit,
	startAfter,
} from 'firebase/firestore'

const useGetData = () => {
	const { usuario } = useAuth()
	const [expenses, setExpenses] = useState([])
	const [lastExpense, setLastExpense] = useState(null)
	const [moreExpenses, setMoreExpenses] = useState(false)

	const getMoreExpenses = () => {
		const request = query(
			collection(db, 'expenses'),
			where('uidUser', '==', usuario.uid),
			orderBy('date', 'desc'),
			limit(10),
			startAfter(lastExpense)
		)

		onSnapshot(
			request,
			(snapshot) => {
				if (snapshot.docs.length > 0) {
					setLastExpense(snapshot.docs[snapshot.docs.length - 1])

					setExpenses(
						expenses.concat(
							snapshot.docs.map((expense) => {
								return { ...expense.data(), id: expense.id }
							})
						)
					)
				} else {
					setMoreExpenses(false)
				}
			},
			(error) => {
				console.log(error)
			}
		)
	}

	useEffect(() => {
		const request = query(
			collection(db, 'expenses'),
			where('uidUser', '==', usuario.uid),
			orderBy('date', 'desc'),
			limit(10)
		)

		const unsuscribe = onSnapshot(request, (snapshot) => {
			if (snapshot.docs.length > 0) {
				setLastExpense(snapshot.docs[snapshot.docs.length - 1])
				setMoreExpenses(true)
			} else {
				setMoreExpenses(false)
			}

			setExpenses(
				snapshot.docs.map((expense) => {
					return { ...expense.data(), id: expense.id }
				})
			)
		})

		return unsuscribe
	}, [usuario])

	return [expenses, getMoreExpenses, moreExpenses]
}

export default useGetData
