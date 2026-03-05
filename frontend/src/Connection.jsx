import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isAdmin } from './utils/Auth.js'  
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/Admin.jsx'
import Home from './pages/Home.jsx'
import Gyms from './pages/Gyms.jsx'
import GymDetails from './pages/GymDetails.jsx'
import About from './pages/About.jsx'
import Classes from './pages/Classes.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
// import BookClass from './pages/BookClass.jsx'

const Connection = () => {
  const ProtectedRoute = ({children}) => {
    return isAdmin() ? children : <Navigate to="/login" replace />  
  }

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/gyms' element={<Gyms/>}/>
          <Route path="/gyms/:id" element={<GymDetails />} />
          <Route path='/classes' element={<Classes/>}/>
          <Route path='/contact' element={<Contact/>}/>
          {/* <Route path='/book/:classId' element={<BookClass/>}/> */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element= {<Signup/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default Connection
