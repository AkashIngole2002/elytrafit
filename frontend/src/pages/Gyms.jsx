import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllGyms, getGymsByCity } from '../service/api'
import GymCard from '../components/home/GymCard'
import homeCSS from '../css/Home.module.css'

const Gyms = () => {
  const [gyms, setGyms] = useState([])
  const [filteredGyms, setFilteredGyms] = useState([])
  const [searchCity, setSearchCity] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const gymsPerPage = 9

  const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'  
    })
  }

  // Load all gyms
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await getAllGyms()
        setGyms(response.data)
        setFilteredGyms(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch gyms:', error)
        setLoading(false)
      }
    }
    fetchGyms()
  }, [])

  // Filter by city
  const handleCitySearch = (city) => {
    setSearchCity(city)
    if (city.trim() === '') {
      setFilteredGyms(gyms)
    } else {
      const filtered = gyms.filter(gym => 
        gym.location.toLowerCase().includes(city.toLowerCase())
      )
      setFilteredGyms(filtered)
    }
  }

  // Pagination
  const indexOfLastGym = page * gymsPerPage
  const indexOfFirstGym = indexOfLastGym - gymsPerPage
  const currentGyms = filteredGyms.slice(indexOfFirstGym, indexOfLastGym)
  const totalPages = Math.ceil(filteredGyms.length / gymsPerPage)

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} />
      </div>
    )
  }

  return (
    <div>
      <section className={`${homeCSS.heroGradient} py-5 mb-5`}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <h1 className="display-3 fw-bold mb-4 lh-1_1">
                All Premium Gyms
              </h1>
              <p className="lead fs-4 mb-5 opacity-90">
                {gyms.length} gyms across India. Find your perfect fitness center.
              </p>
              
              {/* Live City Search */}
              <div className={`input-group input-group-lg ${homeCSS.glassEffect} mx-auto rounded-4`} style={{maxWidth: '600px'}}>
                <span className="input-group-text bg-transparent border-end border-0 px-4">
                  📍
                </span>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 text-white fs-5 py-3 px-3"
                  placeholder="Search Nagpur, Pune, Mumbai..." 
                  value={searchCity}
                  onChange={(e) => handleCitySearch(e.target.value)}
                />
              </div>
              
              {searchCity && (
                <div className="mt-3 text-start text-white-50 small">
                  Found {filteredGyms.length} gyms in "{searchCity}"
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gym Grid */}
      <div className="container">
        <div className="row g-4 mb-5">
          {currentGyms.map((gym, index) => (
            <GymCard key={gym.id} gym={gym} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <li key={number} className={`page-item ${page === number ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => {setPage(number)
                      scrollToTop()}}>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/classes" className="btn btn-lg px-6 py-3 me-3 premiumSecondary" style={{background: 'transparent', border: '2px solid green', color: 'green', fontWeight: '500'}} onClick={scrollToTop}>
            Find Program
          </Link>
          <Link to="/" className="btn btn-lg px-6 py-3 btns" onClick={scrollToTop} style={{backgroundColor: '#FBBF24', fontWeight: '500'}}>
            Back to Home
          </Link>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Gyms
