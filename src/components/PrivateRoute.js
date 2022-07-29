import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RutaProtegida = ({ children }) => {
	const { usuario } = useAuth()

	if (usuario) {
		return children
	} else {
		return <Navigate replace to='/login' />
	}
}

export default RutaProtegida
