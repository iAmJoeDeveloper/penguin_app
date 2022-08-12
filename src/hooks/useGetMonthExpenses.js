import { useState, useEffect } from 'react'
import { db } from './../firebase/firebaseconfig'
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns'
import { useAuth } from './../context/AuthContext'
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'

const useGetMonthExpenses = () => {
	const [expenses, setExpenses] = useState([])
	const { usuario } = useAuth()

	useEffect(() => {
		const inicioDeMes = getUnixTime(startOfMonth(new Date()))
		const finDeMes = getUnixTime(endOfMonth(new Date()))

		if (usuario) {
			const consulta = query(
				collection(db, 'expenses'),
				orderBy('date', 'desc'),
				where('date', '>=', inicioDeMes),
				where('date', '<=', finDeMes),
				where('uidUser', '==', usuario.uid)
			)

			const unsuscribe = onSnapshot(
				consulta,
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

			// Use Effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
			// En este caso queremos que ejecute el unsuscribe a la coleccion de firestore.
			return unsuscribe
		}
	}, [usuario])

	return expenses
}

export default useGetMonthExpenses
