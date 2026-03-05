import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllClasses, getGymsByCity } from '../service/api'
import homeCSS from '../css/Home.module.css'
import ClassCard from '../components/home/ClassCard'
import '../App.css'

const Classes = () => {
  const [classes, setClasses] = useState([])
  const [filteredClasses, setFilteredClasses] = useState([])
  const [searchType, setSearchType] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [availableCities, setAvailableCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const classesPerPage = 9

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const classesResponse = await getAllClasses()
        const allClasses = classesResponse.data
        setClasses(allClasses)
        setFilteredClasses(allClasses)
        
        const uniqueGyms = [...new Set(allClasses.map(cls => cls.gymName).filter(Boolean))]
        setAvailableCities(uniqueGyms.sort())
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch classes:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleFilter = () => {
    console.log('🔍 FILTER:', { searchType, searchCity })
    let filtered = classes
    
    // Filter by class type
    if (searchType) {
      filtered = filtered.filter(cls => 
        cls.type?.toLowerCase().includes(searchType.toLowerCase())
      )
    }
    
    // Filter by gymName
    if (searchCity) {
      filtered = filtered.filter(cls => 
        cls.gymName?.toLowerCase().includes(searchCity.toLowerCase())
      )
    }
    
    console.log('✅ Results:', filtered.length, 'from', classes.length)
    setFilteredClasses(filtered)
    setPage(1)
  }

  const clearFilters = () => {
    console.log('🔄 CLEAR!')
    setSearchType('')
    setSearchCity('')
    setFilteredClasses(classes)
    setPage(1)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Pagination
  const indexOfLastClass = page * classesPerPage
  const indexOfFirstClass = indexOfLastClass - classesPerPage
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass)
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage)

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} />
      </div>
    )
  }

  return (
    <div>
      <section className={`${homeCSS.heroGradient} py-5 mb-5 position-relative z-10`} style={{zIndex: 10}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <h1 className="display-3 fw-bold mb-4">Live Fitness Classes</h1>
              <p className="lead fs-4 mb-5 opacity-90">
                {classes.length}+ classes across {availableCities.length} gyms
              </p>
              
              {/* Filters */}
              <div className="row g-3 justify-content-center mb-4 position-relative z-20" style={{zIndex: 20}}>
                <div className="col-md-4">
                  <select 
                    className={`form-select form-select-lg ${homeCSS.glassEffect}`} 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{backgroundColor: 'transparent', border: '1px groove orange', color: 'black', fontWeight: '400', boxShadow: '5px 5px 8px 2px rgba(17, 17, 17, 0.3)'}}>
                    <option value="">All Types</option>
                    <option value="yoga">Yoga</option>
                    <option value="hiit">HIIT</option>
                    <option value="zumba">Zumba</option>
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="combat">Combat</option>
                    <option value="functional">Functional</option>
                    <option value="core">Core</option>
                    <option value="dance">Dance</option>
                    <option value="crossFit">Cross Fit</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input 
                    type="text" 
                    className={`form-control form-control-lg ${homeCSS.glassEffect}`}
                    placeholder="Enter City(Pune, Nagpur...)"  
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    list="gym-list"
                    style={{backgroundColor: 'transparent', boxShadow: '5px 5px 8px 2px rgba(17, 17, 17, 0.3)', border: '1px groove orange', color: 'black', fontWeight: '400'}}
                    />
                  <datalist id="gym-list">
                    {availableCities.slice(0, 10).map(gym => ( 
                      <option key={gym} value={gym} />
                    ))}
                  </datalist>
                </div>
                <div className="col-md-4">
                  <div className="d-flex g-2 h-100">
                    <button 
                      className="btn btn-lg flex-grow-1 me-1 btns" 
                      type="button"
                      onClick={handleFilter}
                      style={{border: '1px outset #FBBF24', fontWeight: 900, color: '#FBBF24'}}>
                      Filter
                    </button>
                    <button 
                      className="btn btn btn-lg px-4 btns" 
                      type="button"
                      onClick={clearFilters}
                      style={{border: '1px outset gold'}}>
                      🔄
                    </button>
                  </div>
                </div>
              </div>

              {filteredClasses.length !== classes.length && (
                <div className="text-white-50 fs-5">
                  Showing {filteredClasses.length} of {classes.length} classes
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <div className="container">
        <div className="row g-4 mb-5" id="classes-grid">
          {currentClasses.map((classItem) => (
            <ClassCard key={classItem.id} classData={classItem} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mb-5">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => { setPage(page - 1); scrollToTop(); }}>
                    ‹ Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <li key={number} className={`page-item ${page === number ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => { setPage(number); scrollToTop(); }}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => { setPage(page + 1); scrollToTop(); }}>
                    Next ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div className="text-center">
          <Link to="/gyms" className="btn btn-lg px-6 py-3 me-3 premium-primary" onClick={scrollToTop} style={{background: 'transparent', border:'2px solid #d97706', color: '#92400e', fontWeight: '500'}}>
            Browse Gyms
          </Link>
          <Link to="/" className="btn btn-lg px-6 py-3 btns" onClick={scrollToTop} style={{backgroundColor: '#FBBF24', fontWeight: '500'}}>
            Home
          </Link>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Classes
