import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title, ContainerHeader } from './../elements/Header'
import Button from './../elements/Button'
import { Form, Input, ButtonContainer } from './../elements/FormElements'
import penguin from '../img/pplogo.png'
import { ReactComponent as Svglogin } from './../img/registro.svg'
import styled, { createGlobalStyle } from 'styled-components'
import { auth } from './../firebase/firebaseconfig'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Alert from '../elements/Alert'

const Svg = styled.img`
	width: 10%;
	height: 70%;
	max-height: 12.5rem;
	/*100px*/
	margin-bottom: 1.25rem;
	/*20px*/
`

const Box = styled.div`
	width: 100%;
	text-align: center;
`

const Register = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setpassword2] = useState('')
	const [estadoAlerta, setEstadoAlerta] = useState(false)
	const [alerta, setAlerta] = useState({})

	const handleChange = (e) => {
		switch (e.target.name) {
			case 'email':
				setEmail(e.target.value)
				break
			case 'password':
				setPassword(e.target.value)
				break
			case 'password2':
				setpassword2(e.target.value)
				break
			default:
				break
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
		if (email === '' || password === '' || password2 === '') {
			setEstadoAlerta(true)
			setAlerta({ tipo: 'error', message: 'Inputs Empty' })

			return
		}

		//Validation for Match Password
		if (password !== password2) {
			setEstadoAlerta(true)
			setAlerta({ tipo: 'error', message: 'The passwords does not match' })

			return
		}

		try {
			await createUserWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (error) {
			setEstadoAlerta(true)

			let message

			switch (error.code) {
				case 'auth/invalid-password':
					message = 'Password should has minimun 6 characteres'
					break
				case 'auth/email-already-in-use':
					message = 'Email already in use'
					break
				case 'auth/invalid-email':
					message = "Email isn't valid"
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
				<title>Create Account</title>
			</Helmet>

			<Header>
				<ContainerHeader>
					<Title>Create Account</Title>
					<div>
						<Button to='/login'>Login</Button>
					</div>
				</ContainerHeader>
			</Header>

			<Form onSubmit={handleSubmit}>
				<Box>
					<Svg src={penguin} />
				</Box>
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
				<Input
					type='password'
					name='password2'
					placeholder='Repeat Password'
					value={password2}
					onChange={handleChange}
				/>

				<ButtonContainer>
					<Button as='button' primario='true' type='submit'>
						Create Account
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

export default Register
