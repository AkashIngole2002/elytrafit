import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'
import AddUpdateGymClass from '../components/AddUpdateGymClass'
import AddGym from '../components/AddGym'

const Admin = () => {
  return (
    <div className="admin-layout">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />     
        <Route path='/gyms/create' element={<AddGym/>}/>
        <Route path='/gyms/:id/edit' element={<AddGym/>}/>      
        <Route path="/classes/create" element={<AddUpdateGymClass />} />    
        <Route path="/classes/:id/edit" element={<AddUpdateGymClass />} />  
      </Routes>
    </div>
  )
}

export default Admin
