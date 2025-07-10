import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (username, password) => {
    const storedUser = localStorage.getItem(username)
    
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      
      if (userData.password === password) {
        setUser(userData)
        setCurrentView('home')
        return { success: true }
      } else {
        return { success: false, message: 'Incorrect password.' }
      }
    } else {
      return { success: false, message: 'No user found with that username.' }
    }
  }

  const handleRegister = (username, email, password) => {
    if (username && email && password) {
      const userData = { username, email, password }
      localStorage.setItem(username, JSON.stringify(userData))
      setCurrentView('login')
      return { success: true, message: 'Registration successful! You can now log in.' }
    } else {
      return { success: false, message: 'Please fill in all fields.' }
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  return (
    <div className="app">
      <div className="wrapper">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        
        {currentView === 'login' && (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
          />
        )}
        
        {currentView === 'register' && (
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
        
        {currentView === 'home' && user && (
          <Dashboard 
            user={user}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  )
}

export default App