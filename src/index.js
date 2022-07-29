import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WebFont from 'webfontloader'
import Container from './elements/Container'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditExpense from './components/EditExpense'
import ExpensesByCategory from './components/ExpensesByCategory'
import Login from './components/Login'
import ExpensesList from './components/ExpensesList'
import Register from './components/Register'
import { Helmet } from 'react-helmet'
import favicon from './img/logo.png'
import Background from './elements/Background'
import { AuthProvider } from './context/AuthContext'

WebFont.load({
	google: {
		families: ['Work Sans:400,500,700', 'sans-Serif'],
	},
})

const Index = () => {
	return (
		<>
			<Helmet>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Helmet>
			<AuthProvider>
				<BrowserRouter>
					<Container>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/categories' element={<ExpensesByCategory />} />
							<Route path='/list' element={<ExpensesList />} />
							<Route path='/edit/:id' element={<EditExpense />} />
							<Route path='/' element={<App />} />
						</Routes>
					</Container>
				</BrowserRouter>
			</AuthProvider>

			<Background />
		</>
	)
}

ReactDOM.render(<Index />, document.getElementById('root'))

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(

// )
