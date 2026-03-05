import React, { useState } from 'react'
import homeCSS from '../css/Home.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <section className={`${homeCSS.heroGradient} py-5 mb-5 text-white`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-3 fw-bold mb-4">Get In Touch</h1>
              <p className="lead fs-3 opacity-90 mb-5">
                Have questions about classes, gyms, or bookings? We're here to help!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div className={`card border-0 shadow-lg h-100 ${homeCSS.glassEffect}`}>
              <div className="card-body p-5">
                <h2 className="h3 fw-bold mb-4">Connect With Us</h2>
                
                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                        <i className="fa-solid fa-at" style={{color: "rgb(255, 255, 255)", fontSize: '25px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Email Us</h5>
                      <p className="mb-0">support@fitnessfinder.in</p>
                    </div>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i className="fa-solid fa-phone" style={{color: "rgb(0, 118, 208)", fontSize: '25px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Call Us</h5>
                      <p className="mb-0">+91 98745 63210</p>
                      <small className="text-muted">Mon-Sat, 9AM-7PM</small>
                    </div>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                        <i className="fa-brands fa-whatsapp " style={{color: "rgb(15, 234, 72)", fontSize: '47px', overflow: 'hidden'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">WhatsApp</h5>
                      <p className="mb-0">+91 98745 63210</p>
                    </div>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i class="fa-brands fa-facebook" style={{color: "rgb(3, 85, 150)", fontSize: '44px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Facebook</h5>
                      <p className="mb-1">Pune, Maharashtra</p>
                    </div>
                  </div>
                </div>
                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i className="fa-brands fa-instagram" style={{color: "rgb(55, 51, 51)", fontSize: '45px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Instagram</h5>
                      <p className="mb-1">Pune, Maharashtra</p>
                    </div>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i className="fa-brands fa-youtube" style={{color: "rgb(255, 0, 0)", fontSize: '30px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Youtube</h5>
                      <p className="mb-1">Pune, Maharashtra</p>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="d-flex align-items-center">
                    <div className="bg-light bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i className="fa-solid fa-location-dot" style={{color: "rgb(194, 5, 27)", fontSize:'25px'}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Visit Us</h5>
                      <p className="mb-1">Pune, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className={`card border-0 shadow-lg h-100 ${homeCSS.glassEffect}`}>
              <div className="card-body p-5">
                <h2 className="h3 fw-bold mb-4">Send us a Message</h2>
                
                {status === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you {formData.name}! Your message has been sent. We'll reply you shortly.
                    <button type="button" className="btn-close" onClick={() => setStatus('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="your@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-12">
                      <select
                        className="form-select form-select-lg"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required>
                        <option value="" className='text-muted'>How can we help you?</option>
                        <option value="gym-partnership">Gym Partnership</option>
                        <option value="class-booking">Class Booking Issue</option>
                        <option value="app-feedback">App Feedback</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control form-control-lg"
                        rows="7"
                        placeholder="Tell us more about your query..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="privacy" required />
                        <label className="form-check-label fs-6" htmlFor="privacy" >
                          I agree to the Terms and Condition
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100 py-3 fs-5 fw-bold"
                        disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Contact
