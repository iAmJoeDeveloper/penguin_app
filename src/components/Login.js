import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title, ContainerHeader } from './../elements/Header'
import Button from './../elements/Button'
import { Form, Input, ButtonContainer } from './../elements/FormElements'
import { ReactComponent as Svglogin } from './../img/login.svg'
import styled from 'styled-components'

const Svg = styled(Svglogin)`
	width: 100%;
	max-height: 12.5rem; /*100px*/
	margin-bottom: 1.25rem; /*20px*/
`

const Login = () => {
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

			<Form>
				<Svg />
				<Input type='email' name='email' placeholder='Email Address' />
				<Input type='password' name='password' placeholder='Password' />

				<ButtonContainer>
					<Button as='button' primario='true' type='submit'>
						Login
					</Button>
				</ButtonContainer>
			</Form>
		</>
	)
}

export default Login
