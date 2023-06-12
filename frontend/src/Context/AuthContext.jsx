import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = (email, password) => {
    setEmail(email)
    setPassword(password)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setEmail('')
    setPassword('')
    setIsAuthenticated(false)

  }

  const value = {
    isAuthenticated,
    email,
    password,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
