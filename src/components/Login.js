import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header, Title, ContainerHeader } from './../elements/Header'
import Button from './../elements/Button'
import { Form, Input, ButtonContainer } from './../elements/FormElements'
import { ReactComponent as Svglogin } from './../img/login.svg'
import styled from 'styled-components'
import { auth } from './../firebase/firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Alert from '../elements/Alert'

const Svg = styled(Svglogin)`
	width: 100%;
	max-height: 12.5rem; /*100px*/
	margin-bottom: 1.25rem; /*20px*/
`

const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [estadoAlerta, setEstadoAlerta] = useState(false)
	const [alerta, setAlerta] = useState({})

	const handleChange = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setEstadoAlerta(false)
		setAlerta({})

		//validation Email
		const regularExpresion = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

		if (!regularExpresion.test(email)) {
			setEstadoAlerta(true)
			setAlerta({ tipo: 'error', message: 'Email Invalid' })

			return
		}

		//Validation for empty input
		if (email === '' || password === '') {
			setEstadoAlerta(true)
			setAlerta({ tipo: 'error', message: 'Inputs Empty' })

			return
		}

		console.log(email, password)

		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (error) {
			setEstadoAlerta(true)
			console.log(error)
			let message

			switch (error.code) {
				case 'auth/wrong-password':
					message = 'Password Wrong'
					break
				case 'auth/user-not-found':
					message = 'There are not any account with this email'
					break
				default:
					message = 'There was an error when we tried to create your account'
					break
			}
			setAlerta({ tipo: 'error', message: message })
		}
	}

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>

			<Header>
				<ContainerHeader>
					<Title>Login</Title>
					<div>
						<Button to='/register'>Register</Button>
					</div>
				</ContainerHeader>
			</Header>

			<Form onSubmit={handleSubmit}>
				<Svg />
				<Input
					type='email'
					name='email'
					placeholder='Email Address'
					value={email}
					onChange={handleChange}
				/>
				<Input
					type='password'
					name='password'
					placeholder='Password'
					value={password}
					onChange={handleChange}
				/>

				<ButtonContainer>
					<Button as='button' primario='true' type='submit'>
						Login
					</Button>
				</ButtonContainer>
			</Form>

			<Alert
				tipo={alerta.tipo}
				message={alerta.message}
				estadoAlerta={estadoAlerta}
				setEstadoAlerta={setEstadoAlerta}
			/>
		</>
	)
}

export default Login
