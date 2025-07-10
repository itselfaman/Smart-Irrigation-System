import { useState, useEffect } from 'react'

const weatherData = [
  { day: 'Monday', temp: '25°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Tuesday', temp: '22°C', condition: 'Cloudy', icon: '☁️' },
  { day: 'Wednesday', temp: '18°C', condition: 'Rainy', icon: '🌧️' },
  { day: 'Thursday', temp: '20°C', condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Friday', temp: '24°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Saturday', temp: '26°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Sunday', temp: '23°C', condition: 'Windy', icon: '💨' }
]

function WeatherForecast() {
  const [selectedDay, setSelectedDay] = useState(null)

  const handleDayClick = (dayData, index) => {
    setSelectedDay(selectedDay === index ? null : index)
  }

  return (
    <div className="weather-section">
      <h2>Weekly Weather Forecast</h2>
      <div className="weather-forecast">
        {weatherData.map((dayData, index) => (
          <div 
            key={index} 
            className={`day ${selectedDay === index ? 'selected' : ''}`}
            onClick={() => handleDayClick(dayData, index)}
            style={{
              transform: selectedDay === index ? 'scale(1.05)' : 'scale(1)',
              background: selectedDay === index ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: selectedDay === index ? '0 15px 35px rgba(0, 0, 0, 0.3)' : 'none'
            }}
          >
            <div className="weather-icon">{dayData.icon}</div>
            <h3>{dayData.day}</h3>
            <p>{dayData.temp}</p>
            <p className="condition">{dayData.condition}</p>
            {selectedDay === index && (
              <div className="selected-indicator">
                Selected • Click to deselect
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherForecast