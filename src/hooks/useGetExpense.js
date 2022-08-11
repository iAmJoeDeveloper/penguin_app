import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/firebaseconfig'
import { doc, getDoc } from 'firebase/firestore'

const useGetExpense = (id) => {
	const navigate = useNavigate()
	const [expense, setExpense] = useState('')

	useEffect(() => {
		const getExpense = async () => {
			const documento = await getDoc(doc(db, 'expenses', id))

			if (documento.exists) {
				setExpense(documento)
			} else {
				navigate('/ExpensesList')
			}
		}

		getExpense()
	}, [navigate, id])

	return [expense]
}

export default useGetExpense
