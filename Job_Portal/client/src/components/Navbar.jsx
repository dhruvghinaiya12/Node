import React from 'react';
import { Link } from 'react-router-dom';
import jobPortalIcon from '../assets/job-portal.png';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={jobPortalIcon} alt="Job Portal" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">JobPortal</span>
        </div>
        
        <Link to="/" className="text-lg font-semibold hover:text-gray-400 transition">Home</Link>
        
        <div>
          <Link to="/login" className="px-4 py-2 text-sm hover:text-gray-400 transition">Login</Link>
          <Link to="/signup" className="ml-4 px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
