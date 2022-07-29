import React, { useContext, useState, useEffect } from 'react'
import { auth } from './../firebase/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'

//Create Context - Global Estate
const AuthContext = React.createContext()

//Hook to access to the context
const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
	const [usuario, setUsuario] = useState()

	// Creating a state to know when the checking loading onAuthStateChanged Finished
	const [loading, setLoading] = useState(true)

	// Effect to execute checking only once
	useEffect(() => {
		//Check if there is one user
		const cancelSubscription = onAuthStateChanged(auth, (usuario) => {
			setUsuario(usuario)
			setLoading(false)
		})

		return cancelSubscription
	}, [])

	return (
		<AuthContext.Provider value={{ usuario: usuario }}>{!loading && children}</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext, useAuth }
