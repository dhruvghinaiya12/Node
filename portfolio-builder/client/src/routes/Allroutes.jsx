import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PortfolioForm from "../pages/PortfolioForm";
import UserPortfolio from "../pages/UserPortfolio";
import Private from "./Private";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/portfolio-form"
        element={
          <Private>
            <PortfolioForm />
          </Private>
        }
      />
      <Route
        path="/portfolio-details/:userId"
        element={
          <Private>
            <UserPortfolio />
          </Private>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
