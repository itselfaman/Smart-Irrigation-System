import { useState } from 'react'

function LoginForm({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const result = onLogin(username, password)
    
    if (result.success) {
      setUsername('')
      setPassword('')
      setError('')
    } else {
      setError(result.message)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="form-box login">
      <h2 className="animation">🔐 Welcome Back</h2>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {error && <div className="error-message">{error}</div>}
        <button 
          type="submit" 
          className={`btn animation ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : '🚀 Login'}
        </button>
        <div className="logreg-link animation">
          <p>Don't have an account? 
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
              ✨ Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm