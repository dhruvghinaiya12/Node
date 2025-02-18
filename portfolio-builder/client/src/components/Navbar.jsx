import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-semibold flex space-x-6">
            <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
            <Link to="/portfolio-form" className="text-white hover:text-gray-400 transition-colors">Portfolio Details</Link>
          </div>

          <div className="space-x-6">
            <Link to="/signup" className="text-white hover:text-gray-400 transition-colors">Signup</Link>
            <Link to="/login" className="text-white hover:text-gray-400 transition-colors">Login</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
