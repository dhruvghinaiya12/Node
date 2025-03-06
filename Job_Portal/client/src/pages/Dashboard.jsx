import React, { useState, useEffect } from "react";
import ApiLink from "../config/API";
import CompanyCard from "../components/CompanyCard";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);

  const getUnverifiedCompany = async () => {
    try {
      let res = await ApiLink.get("/companies/admin/unverified");
      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await ApiLink.patch(`/companies/${id}`, { isVerified: true });
      setCompanies((prev) => prev.filter((company) => company._id !== id));
      alert("Company verified successfully!");
    } catch (error) {
      console.error("Error approving company:", error);
    }
  };

  useEffect(() => {
    getUnverifiedCompany();
  }, []);

  return (
    <div className="flex items-center justify-center pt-5 bg-gray-100 min-h-[calc(100vh-72px)]">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          Unverified Companies
        </h2>

        {companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company) => (
              <CompanyCard
                key={company._id}
                {...company}
                onApprove={handleApprove}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No unverified companies found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
