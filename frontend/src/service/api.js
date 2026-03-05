import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8082/api'

const api = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const  loginAPI = (login) => api.post('auth/login', login)
export const  signupAPI = (signup) => api.post('auth/register', signup)

// Gym 
// Get All Gyms
export const getAllGyms = () => api.get('gyms')
// Create Gym
export const createGym = (gymData) => api.post('gyms', gymData)
// Get gym by Id
export const getGymById = (id) => api.get(`gyms/${id}`)
// Delete gym
export const deleteGym = (id) => api.delete(`gyms/${id}`)
// Update gym
export const updateGym = (id, gymData) => api.put(`gyms/${id}`, gymData)
// Delete all gyms
export const deleteAllGyms = () => api.delete('gyms')
// Get gym by name
export const getGymsByName = (name) => api.get(`gyms/name/${name}`)
// Get gym by city
export const getGymsByCity = (city) => api.get(`gyms/city/${city}`)

// Gym Classes
// Get all gym classes
export const getAllClasses = () => api.get('gyms/classes')
// Create Gym Classes
export const createClass = (gymId, classData) => api.post(`gyms/${gymId}/classes`, classData)
// Get gym classes by gym id
export const getClassesByGym = (gymId) => api.get(`gyms/classes/gym/${gymId}`) 
// Get gym classes by type
export const getClassesByType = (type) => api.get(`gyms/classes/${type}`) 
// Update gym classes by id
export const updateGymClass = (id, classData) => 
  api.put(`gyms/classes/${id}`, classData)
// Update gymId in gym class
export const updateGymIdInClass = (id, gymId) => 
  api.put(`gyms/classes/${id}/gymId/${gymId}`)
// Filter
export const filterClasses = (filterData) => 
  api.post('gyms/classes/filter', filterData)
// Delete gym classes by id
export const deleteGymClassById = (id) => 
  api.delete(`gyms/classes/${id}`)
// Delete all gym classes
export const deleteAllGymClasses = () => 
  api.delete('gyms/classes')


export default api;
