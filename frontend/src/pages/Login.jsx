import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../service/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await loginAPI({ email, password })
      const { token, userId, email: userEmail, role } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({
        email: userEmail, userId, role  
      }))

      window.location.href = role === 'ADMIN' ? '/admin' : '/'
      
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-body p-5">
            <h3 className="text-center mb-4">Login</h3>
            
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-dark w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center">
              <p>Don't have account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
