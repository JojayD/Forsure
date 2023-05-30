import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import '../Styles/index.css'
import { AuthProvider } from '../Context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <AuthProvider>
          <Router>
              <App />
          </Router>
        </AuthProvider>
      </React.StrictMode>
)
