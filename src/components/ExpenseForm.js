import React, { useState } from 'react'
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
import addExpense from '../firebase/addExpense'
import { useAuth } from '../context/AuthContext'
import Alert from '../elements/Alert'
import { setDate } from 'date-fns'

const ExpenseForm = ({ expense }) => {
	const [inputDescription, setInputDescription] = useState('')
	const [inputCantidad, setInputCantidad] = useState('')
	const [categoria, setCategoria] = useState('hogar')
	const [date, setFecha] = useState(new Date())
	const [estadoAlerta, setEstadoAlerta] = useState(false)
	const [alerta, setAlerta] = useState({})

	const { usuario } = useAuth()

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
					Add Expense <IconoPlus />
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
