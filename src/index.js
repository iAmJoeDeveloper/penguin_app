import React from 'react'
import ReactDOM from 'react-dom'
//import { createRoot } from 'react-dom/client'
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
import favicon from './img/pplogo.png'
import Background from './elements/Background'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import { TotalSpentProvider } from './context/TotalSpentMontContext'

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
				<TotalSpentProvider>
					<BrowserRouter>
						<Container>
							<Routes>
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />

								{/* Private Routes */}
								<Route
									path='/categories'
									element={
										<PrivateRoute>
											<ExpensesByCategory />
										</PrivateRoute>
									}
								/>
								<Route
									path='/list'
									element={
										<PrivateRoute>
											<ExpensesList />
										</PrivateRoute>
									}
								/>
								<Route
									path='/edit/:id'
									element={
										<PrivateRoute>
											<EditExpense />
										</PrivateRoute>
									}
								/>
								<Route
									path='/'
									element={
										<PrivateRoute>
											<App />
										</PrivateRoute>
									}
								/>
							</Routes>
						</Container>
					</BrowserRouter>
				</TotalSpentProvider>
			</AuthProvider>

			<Background />
		</>
	)
}

// const root = createRoot(App)
// root.render(<Index />, document.getElementById('root'))

ReactDOM.render(<Index />, document.getElementById('root'))

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(

// )
