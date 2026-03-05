import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/Footer.avif'

const Footer = () => {
    const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'  
    })
  }
  return (
    <footer className="bg-black text-white py-4 mt-auto" style={{height: '200px'}}>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <Link to="/" className="d-flex align-items-center text-white text-decoration-none" onClick={scrollToTop}>
              <img src={img} style={{height: '30px'}}/>
              <strong>ElytraFit</strong>
            </Link>
          </div>

          <div className="col-md-8 text-md-end">
            <Link to="/classes" className="text-white me-3 opacity-90" onClick={scrollToTop}>Programs</Link>
            <Link to="/gyms" className="text-white me-3 opacity-90" onClick={scrollToTop}>Gyms</Link>
            <Link to="/about" className="text-white me-3 opacity-90" onClick={scrollToTop}>About Us</Link>
            <Link to="/contact" className="text-white me-3 opacity-90" onClick={scrollToTop}>Contacts</Link>
                        
            <i className="fab fa-facebook-f text-white me-3 fs-4 opacity-90"></i>
            <i className="fab fa-instagram text-white me-3 fs-4 opacity-90"></i>  
            <i className="fab fa-youtube text-white me-3 fs-4 opacity-90"></i>
            <i className="fa-solid fa-at text-white me-3 fs-4 opacity-90"></i>
          </div>
        </div>

        <hr className="my-2 opacity-25" />
        <div className="text-center opacity-75 small">
          © 2026 ElytraFit. Pune, India
        </div>
      </div>
    </footer>
  )
}

export default Footer
