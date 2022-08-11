import { db } from './firebaseconfig'
import { doc, updateDoc } from 'firebase/firestore'

const editExpense = async ({ id, category, description, amount, date }) => {
	const documento = doc(db, 'expenses', id)

	return await updateDoc(documento, {
		category: category,
		description: description,
		amount: Number(amount),
		date: date,
	})
}

export default editExpense
