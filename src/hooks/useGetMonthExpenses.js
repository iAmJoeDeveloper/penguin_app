import { getUnixTime, startOfMonth, endOfMonth } from 'date-fns'
import { useState, useEffect } from 'react'
import { db } from '../firebase/firebaseconfig'
import { useAuth } from '../context/AuthContext'
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'

const useGetMonthExpenses = () => {
	const [expenses, setExpenses] = useState([])
	const [usuario] = useAuth()

	useEffect(() => {
		const inicioDeMes = getUnixTime(startOfMonth(new Date()))
		const finDeMes = getUnixTime(endOfMonth(new Date()))

		if (usuario) {
			const request = query(
				collection(db, 'expenses'),
				orderBy('date', 'desc'),
				where('date', '>=', inicioDeMes),
				where('date', '<=', finDeMes),
				where('uidUser', '==', usuario.id)
			)

			const unsuscribe = onSnapshot(
				request,
				(snapshot) => {
					setExpenses(
						snapshot.docs.map((documento) => {
							return { ...documento.data(), id: documento.id }
						})
					)
				},
				(error) => {
					console.log(error)
				}
			)

			return unsuscribe
		}
	}, [usuario])

	return expenses
}

export default useGetMonthExpenses
