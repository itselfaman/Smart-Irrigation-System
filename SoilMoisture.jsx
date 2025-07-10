import { useState, useEffect } from 'react'
import Modal from './Modal'

function SoilMoisture() {
  const [soilMoisture, setSoilMoisture] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [moistureHistory, setMoistureHistory] = useState([])

  useEffect(() => {
    const initialMoisture = Math.floor(Math.random() * 1000)
    setSoilMoisture(initialMoisture)
    setMoistureHistory([initialMoisture])
  }, [])

  const checkSoilCondition = async () => {
    setIsChecking(true)
    
  
    await new Promise(resolve => setTimeout(resolve, 1500))
    
  
    const variation = Math.floor(Math.random() * 100) - 50
    const newMoisture = Math.max(0, Math.min(1000, soilMoisture + variation))
    setSoilMoisture(newMoisture)
    
    setMoistureHistory(prev => [...prev.slice(-4), newMoisture])
    
    let message = ''
    let emoji = ''
    
    if (newMoisture < 100) {
      message = "🚨 Soil is too dry! Your plants need water immediately."
      emoji = "💧"
    } else if (newMoisture > 700) {
      message = "⚠️ Soil is too wet! Hold off on watering to prevent root rot."
      emoji = "🛑"
    } else {
      message = "✅ Perfect! Your soil moisture is in the optimal range."
      emoji = "🌱"
    }
    
    setModalMessage(`${emoji} ${message}`)
    setIsChecking(false)
    setShowModal(true)
  }

  const getMoistureColor = (moisture) => {
    if (moisture < 100) return '#e74c3c'
    if (moisture > 700) return '#f39c12'
    return '#27ae60'
  }

  const getMoistureStatus = (moisture) => {
    if (moisture < 100) return 'Too Dry'
    if (moisture > 700) return 'Too Wet'
    return 'Optimal'
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="soil-section">
      <h2>Soil Moisture</h2>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.12)', 
        padding: '25px', 
        borderRadius: '18px', 
        marginBottom: '25px',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <p style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
          Current Level: 
          <span 
            id="soil-moisture-level" 
            style={{ 
              color: getMoistureColor(soilMoisture),
              fontWeight: 'bold',
              fontSize: '1.6rem',
              marginLeft: '15px'
            }}
          >
            {soilMoisture}
          </span>
        </p>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: getMoistureColor(soilMoisture),
          fontWeight: '600'
        }}>
          Status: {getMoistureStatus(soilMoisture)}
        </p>
        
        {moistureHistory.length > 1 && (
          <div style={{ marginTop: '15px' }}>
            <p style={{ fontSize: '1rem', marginBottom: '10px', opacity: 0.8 }}>
              Recent readings:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {moistureHistory.slice(-5).map((reading, index) => (
                <span 
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    color: getMoistureColor(reading)
                  }}
                >
                  {reading}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <button 
        className={`btn ${isChecking ? 'loading' : ''}`}
        onClick={checkSoilCondition}
        disabled={isChecking}
        style={{
          background: isChecking 
            ? 'rgba(255, 255, 255, 0.3)' 
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          fontSize: '1.1rem',
          padding: '15px 35px'
        }}
      >
        {isChecking ? 'Checking...' : '🔍 Check Soil Condition'}
      </button>
      
      <Modal 
        show={showModal} 
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  )
}

export default SoilMoisture