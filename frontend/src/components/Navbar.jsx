import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAdmin } from '../utils/Auth'
import logo from '../assets/logo.png'
import logoCSS from '../css/Navbar.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const isLoggedIn = localStorage.getItem('user') !== null

  const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'  
    })
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top" style={{zIndex: 1100}}>
      <div className="container-fluid">
        <Link className={`navbar-brand px-3 py-2 rounded-3 ${logoCSS.logo}`} to="/" onClick={scrollToTop} style={{
            fontFamily: '"Neue Haas Grotesk", Futura, sans-serif'}}>
          Elytra<span style={{color: '#fe9605', fontSize: '0.88em'}}>Fit</span>
        </Link>

        
        <button 
          className="navbar-toggler" 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={scrollToTop}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gyms" onClick={scrollToTop}>Gyms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/classes" onClick={scrollToTop}>Programs</Link>
            </li>
            <li>
              <Link className='nav-link' to='/contact' onClick={scrollToTop}>Contacts</Link>
            </li>
            
            {isAdmin() && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={scrollToTop}>🔐 Admin</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {isLoggedIn ? (
              
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light" 
                  onClick={() => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    window.location.reload()
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
            
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
