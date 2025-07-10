import { useState, useEffect } from 'react'
import WeatherForecast from './WeatherForecast'
import SoilMoisture from './SoilMoisture'

function Dashboard({ user, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return '🌅 Good Morning'
    if (hour < 17) return '☀️ Good Afternoon'
    return '🌙 Good Evening'
  }

  return (
    <div className="home page">
      <div className="dashboard-header">
        <h1>🌱 Debug Demons</h1>
        <button className="logout-btn" onClick={onLogout}>
          👋 Logout
        </button>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        background: 'rgba(255, 255, 255, 0.12)',
        padding: '30px',
        borderRadius: '20px',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <p id="welcome-message" style={{ fontSize: '1.6rem', marginBottom: '15px' }}>
          {getGreeting()}, <strong>{user.username}</strong>! 
        </p>
        <p style={{ 
          fontSize: '1.2rem', 
          opacity: 0.8,
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} • {currentTime.toLocaleTimeString()}
        </p>
      </div>
      
      <WeatherForecast />
      <SoilMoisture />
    </div>
  )
}

export default Dashboard