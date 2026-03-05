import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAdmin } from '../../utils/Auth'
import api, { 
  getAllGyms, getAllClasses,
  deleteAllGyms, deleteAllGymClasses, getGymsByCity,
    getClassesByType 
} from '../../service/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({ totalGyms: 0, totalClasses: 0 })
  const [loading, setLoading] = useState(true)
  const [gyms, setGyms] = useState([])
  const [classes, setClasses] = useState([])
  
  // Filter states
  const [cityFilter, setCityFilter] = useState('')
  const [classTypeFilter, setClassTypeFilter] = useState('')

  // Load all data on mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const tab = urlParams.get('tab')
      if (tab && ['dashboard', 'gyms', 'classes'].includes(tab)) {
        setActiveTab(tab)
      }
    }, [])


  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [gymsRes, classesRes] = await Promise.all([
        getAllGyms(),
        getAllClasses()
      ])
      
      setGyms(gymsRes.data)
      setClasses(classesRes.data)
      setStats({
        totalGyms: gymsRes.data.length,
        totalClasses: classesRes.data.length
      })
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCityFilter = async () => {
    if (cityFilter) {
      const cityGyms = await getGymsByCity(cityFilter)
      setGyms(cityGyms.data)
    } else {
      const allGyms = await getAllGyms()
      setGyms(allGyms.data)
    }
  }

  const handleClassTypeFilter = async () => {
    if (classTypeFilter) {
      const filteredClasses = await getClassesByType(classTypeFilter)
      setClasses(filteredClasses.data)
    } else {
      const allClasses = await getAllClasses()
      setClasses(allClasses.data)
    }
  }

  const handleDeleteAllGyms = async () => {
    if (window.confirm('Delete ALL gyms? This cannot be undone!')) {
      await deleteAllGyms()
      fetchDashboardData()
      alert('All gyms deleted!')
    }
  }

  const handleDeleteAllClasses = async () => {
    if (window.confirm('Delete ALL classes? This cannot be undone!')) {
      await deleteAllGymClasses()
      fetchDashboardData()
      alert('All classes deleted!')
    }
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card" style={{ top: '20px' }}>
            <div className="list-group list-group-flush">
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}>
                Dashboard
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'gyms' ? 'active' : ''}`}
                onClick={() => setActiveTab('gyms')}>
                Gyms ({stats.totalGyms})
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'classes' ? 'active' : ''}`}
                onClick={() => setActiveTab('classes')}>
                Classes ({stats.totalClasses})
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Admin Dashboard</h2>
            <span className="badge bg-success fs-6">{isAdmin() ? 'ADMIN' : 'USER'}</span>
          </div>

          {activeTab === 'dashboard' && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card bg-primary text-white shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>Total Gyms</h5>
                        <h2>{stats.totalGyms}</h2>
                      </div>
                      <i className="bi bi-building fs-1 opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="card bg-success text-white shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>Total Classes</h5>
                        <h2>{stats.totalClasses}</h2>
                      </div>
                      <i className="bi bi-calendar3 fs-1 opacity-75"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-danger shadow">
                  <div className="card-header bg-danger text-white">
                    <h5>Red Zone</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <button 
                          className="btn btn-danger w-100"
                          onClick={handleDeleteAllGyms}
                        >
                          Delete All Gyms
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button 
                          className="btn btn-outline-danger w-100"
                          onClick={handleDeleteAllClasses}
                        >
                          Delete All Classes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br/>              
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          )}

          {activeTab === 'gyms' && (
            <div className="card shadow">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Gym Management</h5>
                <div className="input-group" style={{ width: '300px' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter by city..."
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                  <button 
                    className="btn btn-outline-primary"
                    onClick={handleCityFilter}
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto'}}>
                  <table className="table table-hover table-sm">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Price Range</th>  
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gyms.sort((a, b) => a.id - b.id)
                        .map(gym => (
                        <tr key={gym.id}>
                          <td>{gym.id}</td>
                          <td>{gym.imageUrl && <img src={gym.imageUrl} alt="" width="40" /> || 'No Image'}</td>
                          <td>{gym.name}</td>
                          <td>{gym.location}</td>
                          <td>{gym.address}</td>
                          <td>{gym.priceRange}</td> 
                          <td>{gym.rating}</td>
                          <td>
                            <Link to={`/admin/gyms/${gym.id}/edit`} className="btn btn-sm btn-primary me-1">
                              Edit
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={async () => {
                                if (window.confirm(`Delete ${gym.name}?`)) {
                                  await api.delete(`gyms/${gym.id}`)
                                  fetchDashboardData()
                                }
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link to="/admin/gyms/create" className="btn btn-primary mt-3">
                  ➕ Add New Gym
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="card shadow">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Class Management</h5>
                <div className="input-group" style={{ width: '300px' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter by type (Yoga, Zumba...)"
                    value={classTypeFilter}
                    onChange={(e) => setClassTypeFilter(e.target.value)}
                  />
                  <button 
                    className="btn btn-outline-success"
                    onClick={handleClassTypeFilter}
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto'}}>
                  <table className="table table-hover">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>ID</th>
                        <th> Program Name</th>
                        <th>Gym</th>
                        <th>Type</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.sort((a, b) => a.id - b.id)
                        .map(cls => (
                        <tr key={cls.id}>
                          <td>{cls.id}</td>
                          <td>{cls.name}</td>
                          <td>{cls.gymName || 'N/A'}</td>
                          <td>{cls.type}</td>
                          <td>{cls.time}</td>
                          <td>{cls.price} Rs</td>
                          <td>
                            <Link to={`/admin/classes/${cls.id}/edit`} className="btn btn-sm btn-primary me-1">
                              Update Program
                            </Link>
                            <button 
                              className="btn btn-sm btn-warning me-1"
                              onClick={async () => {
                                const newGymId = prompt('Enter new Gym ID:')
                                if (newGymId) {
                                  await api.put(`gyms/classes/${cls.id}/gymId/${newGymId}`)
                                  fetchDashboardData()
                                }
                              }}
                            >
                              Change Gym
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={async () => {
                                if (window.confirm(`Delete ${cls.name}?`)) {
                                  await api.delete(`gyms/classes/${cls.id}`)
                                  fetchDashboardData()
                                }
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link to="/admin/classes/create" className="btn btn-success mt-3">
                  ➕ Add New Class
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <br/>
    </div>
  )
}

export default AdminDashboard

