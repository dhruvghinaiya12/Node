import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import PortfolioForm from '../pages/PortfolioForm';
import UserPortfolio from '../pages/UserPortfolio';


const AllRoutes = () => {
  return (
    
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/portfolio-form" element={<PortfolioForm/>}/>
        <Route path="/portfolio-details" element={<UserPortfolio />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    
  )
}

export default AllRoutes
