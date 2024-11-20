import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleSupplyMedicine = () => {
    // Navigate to the supply medicine page
    navigate('/supplyMedicine');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Customer Dashboard</h2>

      <button
        onClick={handleSupplyMedicine}
        className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
      >
        Supply Medicine
      </button>
    </div>
  );
};

export default CustomerDashboard;
