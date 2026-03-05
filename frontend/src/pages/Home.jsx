import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllGyms, getAllClasses, getGymsByCity, getClassesByType } from '../service/api'
import homeCSS from '../css/Home.module.css'
import { testimonials } from '../data/Data.js'
import { heroImages } from '../data/Data.js'
import GymCard from '../components/home/GymCard.jsx'
import ClassCard from '../components/home/ClassCard.jsx'
import '../App.css'

const Home = () => {
  // SHARED STATE (used by all sections)
  const [featuredGyms, setFeaturedGyms] = useState([])
  const [popularClasses, setPopularClasses] = useState([])
  const [allGyms, setAllGyms] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [stats, setStats] = useState({ gyms: 0, classes: 0, cities: 0 })
  const [searchCity, setSearchCity] = useState('')
  const [loading, setLoading] = useState(true)
  const [slideIndex, setSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

  const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'  
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // LOAD ALL DATA ONCE
  useEffect(() => {
    Promise.all([
      getAllGyms(),
      getAllClasses()
    ]).then(([gymsRes, classesRes]) => {
      const gyms = gymsRes.data
      const classesData = classesRes.data
      
      setAllGyms(gyms)
      setAllClasses(classesData)
      setFeaturedGyms(gyms.slice(0, 6).sort((a, b) => b.rating - a.rating))
      setPopularClasses(classesData.slice(0, 8))
      
      setStats({
        gyms: gyms.length,
        classes: classesData.length,
        cities: [...new Set(gyms.map(g => g.location))].length
      })
      setLoading(false)
    }).catch(console.error)
  }, [])


  const handleCitySearch = async () => {
    if (searchCity.trim()) {
      try {
        const res = await getGymsByCity(searchCity.trim())
        setFeaturedGyms(res.data)
      } catch (error) {
        console.error('City search failed:', error)
        setFeaturedGyms(allGyms.slice(0, 6))
      }
    } else {
      setFeaturedGyms(allGyms.slice(0, 6).sort((a, b) => b.rating - a.rating))
    }
  }

  const LoadingSpinner = () => (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="fitness-home min-vh-100">
      {/*  HERO SECTION */}
      <section className={`${homeCSS.heroGradient} py-5 position-relative`}>
        <div className="container position-relative z-2">
          <div className="row align-items-center min-vh-75">
            <div className="col-xl-7 col-lg-6">
              <div className="mb-5 mb-lg-0">
                <h1 className="display-2 fw-bold mb-4 text-white lh-1_1 drop-shadow">
                  Your Dream <span className="text" style={{color: '#FBBF24'}}>Gym</span>
                  <br className="d-none d-lg-block" />
                  <span className="display-1">Awaits</span>
                </h1>
                <p className="lead fs-4 text-50 mb-5 lh-lg" style={{color: '#d5d5d5'}}>
                  Discover premium gyms and live fitness classes in your city. 
                  Start your transformation journey today!
                </p>
                <div className="d-flex gap-3 flex-lg-nowrap flex-wrap">
                  <Link to="/gyms" className="btn btn btn-lg px-5 py-3 fw-bold fs-6 btns" onClick={scrollToTop} style={{color: "gold"}}> 
                    <span> Explore Gyms Now</span>
                  </Link>
                  <Link to="/classes" className="btn btn-lg px-5 py-3 fw-bold fs-5 btns" onClick={scrollToTop} style={{backgroundColor: "#fe9605"}}>
                    Live Programs
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="position-relative mx-auto" style={{maxWidth: '500px'}}>
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&fit=crop" 
                  className="img-fluid rounded-4 shadow-lg"
                  style={{minHeight: '400px', objectFit: 'cover'}}
                  alt="Premium Fitness Center"
                />
                <div className="position-absolute top-0 end-0 p-4 bg-white bg-opacity-90 rounded-bottom-4 shadow">
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-center">
                      <span className="display-6 text-warning">⭐</span>
                      <div className="fw-bold fs-5 text-dark">4.9</div>
                    </div>
                    <div>
                      <div className="fw-bold fs-6 text-dark mb-1">Muscle Factory</div>
                      <div className="text-muted small">Nagpur</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>

      <section className="py-5 bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container">
          <div className="row g-4 text-center text-black">
            <div className="col-lg-3 col-md-6">
              <div className="display-4 mb-3">
                  <img src='https://cdn-icons-png.flaticon.com/512/4775/4775202.png' alt='🏠' style={{height: '100px', width:'100px'}}/>
              </div>
              <h4>Find Nearby</h4>
              <p className="fs-6 opacity-90">500m radius gyms</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="display-4 mb-3">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlbknLAESnOINVAGOyL_utzdTgT6UK7ehEqg&s' alt='💰' style={{height: '100px', width:'100px'}}/>
              </div>
              <h4>4.9 Rating</h4>
              <p className="fs-6 opacity-90">Top verified gyms</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="display-4 mb-3">
                <img src='https://cdn-icons-png.flaticon.com/512/3343/3343387.png' alt='💰' style={{height: '100px', width:'100px'}}/>
              </div>
              <h4>Affordable</h4>
              <p className="fs-6 opacity-90">Starting ₹500/month</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="display-4 mb-3">
                  <img src='https://cdn-icons-png.flaticon.com/512/5092/5092306.png' alt='📱' style={{height: '100px', width:'100px'}}/>
              </div>
              <h4>Instant Booking</h4>
              <p className="fs-6 opacity-90">Book in 30 seconds</p>
            </div>
          </div>
        </div>
      </section>

      <br/>


      <div>
        {/* LIVE SEARCH BAR */}
        <div className="position-relative border-0 rounded-5" style={{ height: '400px'}}>
            <div 
              className="w-100 h-100" 
              style={{
                backgroundImage: `url(${heroImages[slideIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1s ease-in-out',
                filter: 'blur(5px)'
              }}/>



            <section className="py-5 position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-10 z-3">              
                <div className='container'>
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11">
                      <div className={`card bg-transparent border-0 rounded-5 overflow-hidden ${homeCSS.glassEffect}`} 
                      style={{backdropFilter: 'blur(0px)', background: 'rgba(255,255,255,0.1)'}}>
                        <div className="card-body p-5 text-center">
                          <h3 className="h2 fw-bold mb-4 text-dark">Find Gyms Near You</h3>
                          <div className="row g-4 align-items-end">
                            <div className="col-lg-8 col-md-9">
                              <div className={`input-group input-group-lg ${homeCSS.glassEffect} rounded-4 overflow-hidden`}>
                                <span className="input-group-text bg-transparent border-end border-end-dark border-0 px-4">
                                  📍
                                </span>
                                <input 
                                  type="text" 
                                  className="form-control bg-transparent border-0 fs-6 fw-medium py-3 px-0" 
                                  placeholder="Nagpur, Pune, Mumbai..." 
                                  value={searchCity}
                                  onChange={(e) => setSearchCity(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && e.preventDefault() && handleCitySearch()}/>
                                <button 
                                  className="btn px-5 py-3 fw-bold fs-6 searchBtn" 
                                  onClick={handleCitySearch}>
                                  Search
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-3">
                              <small className="text-muted d-block mb-2">Popular cities:</small>
                              <div className="d-flex gap-2 flex-wrap">
                                {['Nagpur', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad'].map(city => (
                                  <button
                                    key={city}
                                    className="btn btn-sm px-3 py-2 fw-medium rounded-pill searchBtn"
                                    onClick={() => {
                                      setSearchCity(city)
                                      handleCitySearch()
                                    }}>
                                    {city}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </div>
        
        <div className='container-fluid'>
        {/* FEATURED PREMIUM GYMS */}
        <section className="py-5">
          <div className="text-center mb-6">
            <h2 className="display-4 fw-bold mb-4 lh-1"> Premium Gyms</h2>
            <p className="lead text-muted fs-4">Handpicked top-rated fitness centers near you</p>
          </div>
          <div className="row g-4">
            {featuredGyms.map((gym, index) => (
              <GymCard key={gym.id} gym={gym} index={index} />
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/gyms" className="btn btn-lg px-6 py-3 fw-bold fs-6 premium-primary" onClick={scrollToTop} style={{backgroundColor: '#92400e', color: 'white'}}>
              View All Gyms
            </Link>
          </div>
        </section>

        {/* LIVE STATS COUNTER */}
        <section className={`${homeCSS.statsGradient} text-white rounded-5 p-5 my-6 shadow-2xl overflow-hidden`}>
          <div className="row g-5 text-center align-items-center">
            <div className="col-lg-4">
              <div className="display-3 fw-bold mb-3 lh-1" style={{fontSize: '4rem'}}>
                {stats.gyms.toLocaleString()}
              </div>
              <h4 className="fw-bold fs-3 mb-1">Premium Gyms</h4>
              <p className="fs-6 opacity-90">Across India</p>
            </div>
            <div className="col-lg-4">
              <div className="display-3 fw-bold mb-3 lh-1" style={{fontSize: '4rem'}}>
                {stats.classes.toLocaleString()}
              </div>
              <h4 className="fw-bold fs-3 mb-1">Live Classes</h4>
              <p className="fs-6 opacity-90">Daily Sessions</p>
            </div>
            <div className="col-lg-4">
              <div className="display-3 fw-bold mb-3 lh-1" style={{fontSize: '4rem'}}>
                {stats.cities}+
              </div>
              <h4 className="fw-bold fs-3 mb-1">Cities Covered</h4>
              <p className="fs-6 opacity-90">Major Metro Cities</p>
            </div>
          </div>
        </section>

        {/* TRENDING CLASSES */}
        <section className="py-5">
          <div className="text-center mb-6">
            <h2 className="display-4 fw-bold mb-4 lh-1"> Trending Classes</h2>
            <p className="lead text-muted fs-4">Join live sessions from top instructors</p>
          </div>
          <div className="row g-4" style={{height: '800px'}}>
            {popularClasses.slice(0, 6).map(cls => (
              <ClassCard key={cls.id} classData={cls} />
            ))}
          </div>
          <br/> 
          <div className="text-center" style={{marginTop: '70px'}}>
            <Link to="/classes" className="btn btn-success btn-lg px-6 py-3 fw-bold fs-6 premiumSecondary" onClick={scrollToTop}>
              Gym Programs
            </Link>
          </div>
        </section>
      </div>
      <br/>

      {/* Testimonials */}
      <section className="py-5 bg-dark bg-opacity-75">
        <div className="container">
          <h2 className="text-white text-center mb-5 display-5 fw-bold">What Users Say</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={homeCSS.testimonialSlider}>
                <div 
                  className="d-flex testimonial-track"
                  style={{ 
                    transform: `translateX(${-testimonialIndex * 100}%)`,
                    transition: 'transform 0.5s ease-in-out',
                    gap: '0rem'
                  }}>
                
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className={`${homeCSS.testimonialCard} flex-shrink-0 testimonial-slide`}>
                      <div className={homeCSS.quoteText}>{testimonial.quote}</div>
                      <div className={homeCSS.authorName}>{testimonial.name}</div>
                      <div className={`${homeCSS.city} h6 opacity-75`}>{testimonial.city}</div>
                    </div>
                  ))}
                </div>

                {/* Dots */}
                <div className="d-flex justify-content-center gap-2 mt-5">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`${homeCSS.navDot} ${index === testimonialIndex ? homeCSS.navDotActive : ''}`}
                      onClick={() => setTestimonialIndex(index)}
                    />
                  ))}
                </div>
                
                {/* Arrows */}
                <button 
                  className={`${homeCSS.navArrow} ${homeCSS.navArrowPrev}`}
                  onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
                  ‹
                </button>
                <button 
                  className={`${homeCSS.navArrow} ${homeCSS.navArrowNext}`}
                  onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}>
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
