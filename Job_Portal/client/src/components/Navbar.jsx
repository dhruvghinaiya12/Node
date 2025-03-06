import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jobPortalIcon from '../assets/job-portal.png';
import { UserToken } from "../UserToken";
import Cookies from "js-cookie";

const Navbar = () => {
  const nav = useNavigate();
  let user = UserToken();
  const isLogged = Cookies.get("isLogged");

  const logout = () => {
    Cookies.remove("isLogged");
    Cookies.remove("token");
    nav("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center cursor-pointer">
          <img src={jobPortalIcon} alt="Job Portal" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">JobPortal</span>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-lg font-semibold hover:text-gray-400 transition">Home</Link>
          <Link to="/dashboard" className="text-lg font-semibold hover:text-gray-400 transition">Dashboard</Link>
          <Link to="/jobs" className="text-lg font-semibold hover:text-gray-400 transition">Add Jobs</Link>
          <Link to="/company" className="text-lg font-semibold hover:text-gray-400 transition">Create Company</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <span className="px-4 py-2 text-sm hover:text-gray-400 transition cursor-pointer">{user.name}</span>
          ) : (
            <Link to="/signup" className="px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition ">
              Sign Up
            </Link>
          )}

          {isLogged ? (
            <button 
              className="px-4 py-2 text-sm hover:text-gray-400 transition cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm hover:text-gray-400 transition">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
