import React from 'react'
import { Link } from 'react-router-dom'
import homeCSS from '../css/Home.module.css'
import imgOne from '../assets/OurMissionImg.png'
import imgTwo from '../assets/OurStoryImg.png'

const About = () => {
  return (
    <div>
      <section className={`${homeCSS.heroGradient} py-5 mb-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-3 fw-bold mb-4" style={{
                color: '#F8FAFC',
                textShadow: '0 4px 16px rgba(0,0,0,0.7)'
              }}>
                ElytraFit
              </h1>
              <p className="fs-2 fw-bold mb-3" style={{
                color: '#FBBF24',
                textShadow: '0 2px 8px rgba(251,191,36,0.4)'
              }}>
                Forge Your Elite Self
              </p>
              <p className="lead fs-3 opacity-90 mb-5" style={{
                color: '#E2E8F0',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                Your one-stop platform to discover, book, and crush your fitness goals across 50+ gyms in India
              </p>
            </div>
          </div>
        </div>
      </section>
            

      <div className="container">
        {/* Our Mission */}
        <section className="py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
              <p className="fs-4 text-muted mb-4">
                Making fitness accessible to everyone in India. From Pune's powerlifters to Mumbai's yoga enthusiasts, 
                we connect you with the best gyms, classes, and trainers near you.
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="text-center p-4 bg-light rounded-4 shadow-sm">
                    <div className="display-6 mb-3">50+</div>
                    <div className="h6 fw-bold text-primary">Gyms</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center p-4 bg-light rounded-4 shadow-sm">
                    <div className="display-6 mb-3">500+</div>
                    <div className="h6 fw-bold text-success">Classes Daily</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={imgOne} alt="Fitness Mission" className="img-fluid rounded-4 shadow-lg" />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-5 bg-white rounded-4 shadow-lg">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">Why FitnessFinder?</h2>
            <p className="lead fs-4 text-muted">Everything you need for your fitness journey</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="icon-box mb-4">
                <div className="display-4 text-primary mb-3">
                  <img src='https://cdn-icons-png.flaticon.com/512/9151/9151181.png' alt='🔍' style={{height: '60px'}}/>
                </div>
                <h4 className="h3 fw-bold mb-3">Easy Discovery</h4>
                <p className="fs-5 text-muted">Filter by city, gym, class type. Find perfect workout in seconds.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="icon-box mb-4">
                <div className="display-4 text-success mb-3" style={{fontSize: '60px'}}>⚡</div>
                <h4 className="h3 fw-bold mb-3">Instant Booking</h4>
                <p className="fs-5 text-muted">One-click booking with secure payments. No waiting, no hassle.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="icon-box mb-4">
                <div className="display-4 text-warning mb-3">
                  <img src='https://static.vecteezy.com/system/resources/previews/010/927/285/non_2x/globe-and-people-icon-on-white-background-world-community-sign-flat-style-vector.jpg' alt='👥' style={{height: '60px'}}/>
                </div>
                <h4 className="h3 fw-bold mb-3">Trusted Network</h4>
                <p className="fs-5 text-muted">Partnered with 50+ verified gyms. Real trainers, real results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 order-lg-1">
              <img src={imgTwo} alt="Our Story" className="img-fluid rounded-4 shadow-lg" />
            </div>
            <div className="col-lg-6 order-lg-2">
              <h2 className="display-5 fw-bold mb-4">Our Story</h2>
              <div className="timeline mb-5">
                <div className="timeline-item mb-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">2025</span>
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <h5 className="fw-bold">Founded in Pune</h5>
                      <p>Born from frustration - couldn't find HIIT classes nearby!</p>
                    </div>
                  </div>
                </div>
                <div className="timeline-item mb-4">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0">
                      <span className="badge bg-success rounded-pill fs-6 px-3 py-2">2026</span>
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <h5 className="fw-bold">50+ Gyms Network</h5>
                      <p>Expanded to Mumbai, Delhi, Bangalore. 500+ daily classes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="fs-4 text-muted">
                Built by fitness lovers, for fitness lovers. 
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-5 bg-light rounded-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">Loved by Fitness Enthusiasts</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body p-5 text-center">
                  <h5 className="fw-bold mb-2">Priya S.</h5>
                  <p className="text-muted mb-0">"Found Yoga classes 2km from home. Booked in 10 seconds. Game changer!"</p>
                  <div className="stars mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body p-5 text-center">
                  <h5 className="fw-bold mb-2">Rohan K.</h5>
                  <p className="text-muted mb-0">"PowerGym HIIT classes discovered through app. Best decision ever."</p>
                  <div className="stars mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body p-5 text-center">
                  <h5 className="fw-bold mb-2">Anita M.</h5>
                  <p className="text-muted mb-0">"Zumba in Mumbai suburbs. Easy booking + reminders. Love it!"</p>
                  <div className="stars mt-3">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 text-center">
          <div className={`card border-0 shadow-lg p-5 ${homeCSS.glassEffect}`}>
            <h2 className="display-5 fw-bold mb-4 text-dark">Ready to Start?</h2>
            <p className="lead fs-4 text-dark-50 mb-4">
              Join 10,000+ fitness enthusiasts discovering classes daily
            </p>
            <div className="d-grid d-md-flex gap-3 justify-content-center">
              <Link to="/classes" className="btn btn-dark btn-lg px-5 py-3 fs-5">
                Find Programs
              </Link>
              <Link to="/gyms" className="btn btn-outline-dark btn-lg px-5 py-3 fs-5">
                Explore Gyms
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
