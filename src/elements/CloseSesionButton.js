import React from 'react'
import { ReactComponent as IconCloseSesion } from './../img/log-out.svg'
import Button from './Button'
import { auth } from './../firebase/firebaseconfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const CloseSesionButton = () => {
	const navigate = useNavigate()

	const closeSesion = async () => {
		try {
			await signOut(auth)
			navigate('/login')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button inconoGrande as='button' onClick={closeSesion}>
			<IconCloseSesion />
		</Button>
	)
}

export default CloseSesionButton
