import React, { useState, useEffect } from "react";
import ApiLink from "../config/API";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);

  const getUnverifiedCompany = async () => {
    try {
      let res = await ApiLink.get("/companies/admin/unverified");
      setCompanies(res.data);
      console.log(res.data);
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
            {companies.map(({ companyName, location, number, _id }) => (
              <div
                key={_id}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg flex justify-between items-center shadow"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {companyName}
                  </h3>
                  <p className="text-gray-600">Location: {location}</p>
                  <p className="text-gray-600">Contact: {number}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(_id)}
                    className="flex items-center gap-1 bg-green-600 px-3 py-2 rounded-lg text-white hover:bg-green-500 transition"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    Approve
                  </button>
                  <button
                    className="flex items-center gap-1 bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-500 transition"
                  >
                    <XCircleIcon className="h-5 w-5" />
                    Reject
                  </button>
                </div>
              </div>
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
