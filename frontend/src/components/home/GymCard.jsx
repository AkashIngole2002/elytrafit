import React from 'react'
import homeCSS from '../../css/Home.module.css'
import { Link } from 'react-router-dom'

const GymCard = (props) => {
    const { gym, index } = props

    const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth' 
    })
  }
  return (
    <div className="col-xl-4 col-lg-6 col-md-6">
        <div className={`card ${homeCSS.cardHover} h-100 rounded-4 overflow-hidden`}>
          <div className="position-relative">
            <img 
              src={gym.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&fit=crop'}
              className="card-img-top" 
              alt={gym.name}
              style={{height: '240px', objectFit: 'cover'}}
            />
            <div className="position-absolute top-3 end-3 z-3">
              <span className={`badge bg-primary fs-6 px-4 py-2 fw-bold ${homeCSS.starGradient}`}>
                ⭐ {gym.rating?.toFixed(1)}
              </span>
            </div>
            {index === 0 && (
              <div className="position-absolute top-3 start-3">
              </div>
            )}
          </div>
          <div className="card-body p-4 d-flex flex-column h-100">
            <h5 className="card-title fw-bold fs-5 lh-1_2 position-relative bottom-0 pt-3 start-0 ps-0">{gym.name}</h5>
            <p className="text-muted mb-4 flex-grow-1 fs-6">{gym.location}</p>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="h6 fw-bold text-success fs-5">{gym.priceRange}</span>
              <span className="badge bg-light text-dark fs-6 px-3 py-2">
                📈 {gym.count || 0}+ programs
              </span>
            </div>
            <Link 
              to={`/gyms/${gym.id}`} 
              className="btn btn-primary w-100 py-3 mt-auto fw-bold fs-6 premium-primary"
              onClick={scrollToTop}>
              View Details
            </Link>
          </div>
        </div>
      </div>
  )
}

export default GymCard