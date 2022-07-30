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

const ExpenseForm = () => {
	const [inputDescription, setInputDescription] = useState('')
	const [inputCantidad, setInputCantidad] = useState('')

	const handleChange = (e) => {
		if (e.target.name === 'description') {
			setInputDescription(e.target.value)
		} else if (e.target.name === 'cantidad') {
			setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''))
		}
	}

	return (
		<Form>
			<FiltersContainer>
				<p>Select</p>
				<p>Date Picker</p>
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
		</Form>
	)
}

export default ExpenseForm
