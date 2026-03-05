import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGymById, getClassesByGym } from '../service/api'
import homeCSS from '../css/Home.module.css'

const GymDetails = () => {
  const { id } = useParams() 
  const [gym, setGym] = useState(null)
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const gymResponse = await getGymById(id)
        const classesResponse = await getClassesByGym(id)
        setGym(gymResponse.data)
        setClasses(classesResponse.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch gym details:', error)
        setLoading(false)
      }
    }
    fetchGymDetails()
  }, [id])

  if (loading) {
    return <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" /></div>
  }

  if (!gym) {
    return <div className="min-vh-100 d-flex justify-content-center align-items-center">Gym not found</div>
  }

  return (
    <div>
      <section className={`position-relative ${homeCSS.heroGradient} py-5 mb-5 overflow-hidden`}>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-2 fw-bold text-white mb-4">{gym.name}</h1>
              <div className="fs-4 text-white-50 mb-4">{gym.location}</div>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/gyms" className="btn btn-lg px-5 btns" style={{fontWeight: 600, fontFamily: 'sans-serif', color: 'gold'}}>All Gyms</Link>
                <Link to="/" className="btn btn-warning btn-lg px-5 btns" style={{fontWeight: 600, fontFamily: 'sans-serif', backgroundColor: "#fe9605"}}>Home</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img src={gym.imageUrl || 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400'} className="img-fluid rounded-4 shadow-lg" alt='' style={{height: '250px', width: '400px'}} />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row g-5">
          {/* Gym Info */}
          <div className="col-lg-8">
            <div className={`card ${homeCSS.glassEffect} border-0 shadow-xl h-100`}>
              <div className="card-body p-5">
                <h2 className="display-6 mb-4">
                  <i className="fa-solid fa-location-dot" style={{color: "rgb(194, 5, 27)", fontSize:'35px'}}></i>
                   <span> Address</span>
                </h2>
                <p className="fs-5 text-muted lh-lg mb-5">{gym.address}</p>
                
                <div className="row g-4 mb-5">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="fs-1 me-3">
                        <img src='https://static.vecteezy.com/system/resources/thumbnails/069/295/504/small/golden-indian-rupee-currency-symbol-on-transparent-background-png.png' style={{height: '60px'}}/>
                      </div>
                      <div>
                        <h5>Price</h5>
                        <div>{gym.priceRange || 'Contact via app'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="fs-1 me-3">
                        <img src='https://illustoon.com/photo/5065.png' style={{height: '60px'}}/>
                      </div>
                      <div>
                        <h5>Hours</h5>
                        <div>24/7 Access</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Classes List */}
                <div>
                  <h3 className="mb-4">Available Programs</h3>
                  <div className="row g-3">
                    {classes.length > 0 ? (
                      classes.map((classItem) => (
                      <div key={classItem.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm hover:shadow-xl transition-all">
                          <div className="card-body">
                            <h5>{classItem.name}</h5>
                            <p className="text-muted">{classItem.type} • {classItem.time}</p>
                            <div className="badge bg-primary">{classItem.instructor}</div>
                          </div>
                        </div>
                      </div>
                    ))
                    ) : (
                      <div className="col-12">
                        <h5 className="text-muted text">No classes available</h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className={`card sticky-top ${homeCSS.glassEffect} border-0 shadow-xl`} style={{top: '2rem'}}>
              <div className="card-body p-4">
                <h4><img src='https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F1639%2FPNG%2F256%2F12210gemstone_109588.png&id=109588&pack_or_individual=pack' style={{height: '25px'}}/> Premium Features</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ 24/7 Access</li>
                  <li className="mb-2">✅ Personal Trainers</li>
                  <li className="mb-2">✅ Live Classes</li>
                  <li className="mb-2">✅ Free Parking</li>
                  <li className="mb-2">✅ Sauna & Steam</li>
                </ul>
                
                <hr />
                <h5>⭐ Rating</h5>
                <div className="fs-4 mb-3">{gym.rating} ★ </div>
                
                <button className="btn btn-dark w-100 mb-3">Join Now</button>
                <button className="btn btn-outline-secondary w-100">Get Directions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>
  )
}

export default GymDetails
