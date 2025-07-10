import { useState } from 'react'

function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordStrength(checkPasswordStrength(newPassword))
  }

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0: return { text: 'Very Weak', color: '#e74c3c' }
      case 1: return { text: 'Weak', color: '#f39c12' }
      case 2: return { text: 'Fair', color: '#f1c40f' }
      case 3: return { text: 'Good', color: '#2ecc71' }
      case 4: return { text: 'Strong', color: '#27ae60' }
      default: return { text: '', color: '' }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const result = onRegister(username, email, password)
    
    setMessage(result.message)
    setIsError(!result.success)
    
    if (result.success) {
      setUsername('')
      setEmail('')
      setPassword('')
      setPasswordStrength(0)
      setTimeout(() => {
        onSwitchToLogin()
        setMessage('')
      }, 2000)
    }
    
    setIsLoading(false)
  }

  const strengthInfo = getPasswordStrengthText(passwordStrength)

  return (
    <div className="form-box register">
      <h2 className="animation">🌟 Join Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box animation">
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required 
          />
          <label>Username</label>
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box animation">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required 
          />
          <label>Email</label>
          <i className='bx bxs-envelope'></i>
        </div>
        <div className="input-box animation">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            required 
          />
          <label>Password</label>
          <i 
            className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        
        {password && (
          <div className="password-strength-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Password Strength:</span>
              <span style={{ color: strengthInfo.color, fontWeight: 'bold' }}>
                {strengthInfo.text}
              </span>
            </div>
            <div className="password-strength-bar" style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.2)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(passwordStrength / 4) * 100}%`,
                height: '100%',
                background: strengthInfo.color,
                transition: 'all 0.3s ease'
              }} />
            </div>
          </div>
        )}
        
        {message && (
          <div className={`message ${isError ? 'error-message' : 'success-message'}`}>
            {isError ? '❌' : '✅'} {message}
          </div>
        )}
        <button 
          type="submit" 
          className={`btn animation ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : '🎉 Sign Up'}
        </button>
        <div className="logreg-link animation">
          <p>Already have an account? 
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
              🔑 Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm