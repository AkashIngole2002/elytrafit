import React from 'react'
import { Link } from 'react-router-dom'
import yoga from '../../assets/YogaImg.png'
import { classImg } from '../../data/Data.js'

const ClassCard = (props) => {
    const { classData } = props
    const getClassEmoji = () => {
      const type = classData.type?.toLowerCase()
      if (type?.includes('yoga')) return <img src={yoga} alt='Yoga' style={{height: '115px', width: '115px', objectFit: 'cover'}}/>
      if (type?.includes('zumba')) return <img src={classImg[1]} alt='Yoga' style={{height: '131px', width: '130px', objectFit: 'contains'}}/>
      if (type?.includes('hiit')) return <img src={classImg[2]} alt='hiit' style={{height: '130px', width: '130px', objectFit: 'cover'}}/>
      if (type?.includes('combat')) return <img src={classImg[3]} alt='combat' style={{height: '120px', width: '120px', objectFit: 'cover'}}/>
      if (type?.includes('core')) return <img src={classImg[9]} alt='core' style={{height: '120px', width: '120px', objectFit: 'cover'}}/>
      if (type?.includes('functional')) return <img src={classImg[4]} alt='functional' style={{height: '120px', width: '120px', objectFit: 'cover'}}/>
      if (type?.includes('dance')) return <img src={classImg[5]} alt='dance' style={{height: '120px', width: '120px', objectFit: 'cover'}}/>
      if (type?.includes('strength')) return <img src={classImg[6]} alt='strength' style={{height: '140px', width: '140px', objectFit: 'cover'}}/>
      if (type?.includes('cardio')) return <img src={classImg[7]} alt='ardio' style={{height: '90px', width: '90px', objectFit: 'cover'}}/>
      return <img src={classImg[8]} alt='crossfit' style={{height: '130px', width: '130px', objectFit: 'cover'}}/>
    }
  return (
    <div className="col-lg-4 col-md-6">
        <div className="card card-hover h-100 rounded-4 text-center overflow-hidden border-0 shadow-lg">
          <div className="card-body py-5 px-3 position-relative">
            <div 
              className="position-absolute top-0 start-50 translate-middle-x p-3 bg-light bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
              style={{width: '120px', height: '120px', marginTop: '10px', overflow: 'hidden'}}>
              {getClassEmoji()}
            </div>
            <div style={{marginTop: '90px'}}>
              <h4 className="fw-bold mb-4 fs-4">{classData.name}</h4>
              <p className="text-muted mb-4 h6">{classData.gymName}</p>
              <div className="row g-3 mb-4 justify-content-center">
                <div className="col-6">
                  <div className="bg-light rounded-pill px-4 py-2 shadow-sm">
                    <small className="fw-bold text-primary">{classData.time}</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-success text-white rounded-pill px-4 py-2 shadow-sm">
                    <small className="fw-bold">₹{classData.price}</small>
                  </div>
                </div>
              </div>
              <Link 
                className="btn btn w-100 py-3 fw-bold fs-6 premium-accent">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ClassCard