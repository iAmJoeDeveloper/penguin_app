import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	FiltersContainer,
	Form,
	Input,
	InputLarge,
	ButtonContainer,
} from './../elements/FormElements'
import Button from '../elements/Button'
import { ReactComponent as IconoPlus } from '../img/plus.svg'
import SelectCategories from './SelectCategories'
import DatePicker from './DatePicker'
import getUnixTime from 'date-fns/getUnixTime'
import fromUnixTime from 'date-fns/fromUnixTime'
import addExpense from '../firebase/addExpense'
import { useAuth } from '../context/AuthContext'
import Alert from '../elements/Alert'
import { setDate } from 'date-fns'
import editExpense from '../firebase/editExpense'

const ExpenseForm = ({ expense }) => {
	const [inputDescription, setInputDescription] = useState('')
	const [inputCantidad, setInputCantidad] = useState('')
	const [categoria, setCategoria] = useState('hogar')
	const [date, setFecha] = useState(new Date())
	const [estadoAlerta, setEstadoAlerta] = useState(false)
	const [alerta, setAlerta] = useState({})
	const navigate = useNavigate()

	const { usuario } = useAuth()

	useEffect(() => {
		//Check if there is a expense
		//If yes set state with value's expense
		if (expense) {
			//check if the expense belongs to current user
			//we need to check the uid
			if (expense.data().uidUser === usuario.uid) {
				setCategoria(expense.data().category)
				setFecha(fromUnixTime(expense.data().date))
				setInputDescription(expense.data().description)
				setInputCantidad(expense.data().amount)
			} else {
				navigate('/list')
			}
		}
	}, [expense, usuario])

	const handleChange = (e) => {
		if (e.target.name === 'description') {
			setInputDescription(e.target.value)
		} else if (e.target.name === 'cantidad') {
			setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let amount = parseFloat(inputCantidad).toFixed(2)

		//Check if Description and Value exist
		if (inputDescription !== '' && inputCantidad !== '') {
			if (amount) {
				if (expense) {
					editExpense({
						id: expense.id,
						category: categoria,
						description: inputDescription,
						amount: amount,
						date: getUnixTime(date),
					})
						.then(() => {
							navigate('/list')
						})
						.catch((e) => {
							console.log(e)
						})
				} else {
					addExpense({
						category: categoria,
						description: inputDescription,
						amount: amount,
						date: getUnixTime(date),
						uidUser: usuario.uid,
					})
						.then(() => {
							setCategoria('hogar')
							setInputDescription('')
							setInputCantidad('')
							setFecha(new Date())

							setEstadoAlerta(true)
							setAlerta({ tipo: 'exito', message: 'Expense added successfully!' })
						})
						.catch((error) => {
							setEstadoAlerta(true)
							setAlerta({ tipo: 'error', message: error.message })
						})
				}
			} else {
				setEstadoAlerta(true)
				setAlerta({ tipo: 'error', message: 'Invalid Amount' })
			}
		} else {
			setEstadoAlerta(true)
			setAlerta({ tipo: 'error', message: 'Inputs Empty' })
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FiltersContainer>
				<SelectCategories categoria={categoria} setCategoria={setCategoria} />
				<DatePicker date={date} setFecha={setFecha} />
			</FiltersContainer>
			<div>
				<Input
					type='text'
					name='description'
					id='description'
					placeholder='Expense Description'
					value={inputDescription}
					onChange={handleChange}
				/>
				<InputLarge
					type='text'
					name='cantidad'
					id='cantidad'
					placeholder='$0.00'
					value={inputCantidad}
					onChange={handleChange}
				/>
			</div>
			<ButtonContainer>
				<Button as='button' primario conIcono type='submit'>
					{expense ? 'Edit Expense' : 'Add Expense'} <IconoPlus />
				</Button>
			</ButtonContainer>
			<Alert
				tipo={alerta.tipo}
				message={alerta.message}
				estadoAlerta={estadoAlerta}
				setEstadoAlerta={setEstadoAlerta}
			/>
		</Form>
	)
}

export default ExpenseForm
