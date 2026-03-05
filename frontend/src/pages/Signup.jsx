import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupAPI } from '../service/api'

const Signup = () => {
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState('')
  let navigate = useNavigate()

  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { name, email, password } = formData
      
      if (password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const response = await signupAPI({
        name,
        email,
        password
      })
      
      const { token, userId, email: userEmail, role } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ 
        name, email: userEmail, userId, role 
      }))
      
      if (email === 'fitnessfinderadmin@gmail.com' && password === 'admin123') {
        navigate('/admin')
      } else {
        navigate('/')
      }
      
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow">
          <div className="card-body p-5">
            <h3 className="text-center mb-4">Sign Up</h3>
            
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center">
              <p>Already have account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
