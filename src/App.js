import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Title, ContainerHeader, ContainerButtons } from './elements/Header'
import Button from './elements/Button'

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
						<Button to='/X'>X</Button>
					</ContainerButtons>
				</ContainerHeader>
			</Header>
		</>
	)
}

export default App
