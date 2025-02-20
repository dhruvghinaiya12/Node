import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AddJob from '../pages/AddJob';
import Company from '../pages/Company';
import Dashboard from '../pages/Dashboard';



const AllRoutes = () => {
  return (
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<AddJob />} />
        <Route path="/company" element={<Company />} />
        {/* <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>
    
  )
}

export default AllRoutes
