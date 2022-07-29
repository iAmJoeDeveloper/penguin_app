import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title, ContainerHeader, ContainerButtons } from './elements/Header'
import Button from './elements/Button'
import CloseSesionButton from './elements/CloseSesionButton'

const App = () => {
	return (
		<>
			<Helmet>
				<title>Add Expense</title>
			</Helmet>
			<Header>
				<ContainerHeader>
					<Title>Add Expense</Title>
					<ContainerButtons>
						<Button to='/categories'>Categories</Button>
						<Button to='/list'>Expense List</Button>
						<CloseSesionButton />
					</ContainerButtons>
				</ContainerHeader>
			</Header>
		</>
	)
}

export default App
