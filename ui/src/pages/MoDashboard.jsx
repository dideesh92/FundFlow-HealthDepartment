import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoDashboard = () => {
  const navigate = useNavigate();

  const handleCreateMedicine = () => {
    // Navigate to the create medicine page
    navigate('/createMedicine');
  };

  const handleViewMedicineRequests = () => {
    // Navigate to the view medicine requests page
    navigate('/readmed');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">MO Dashboard</h2>
      
      <button
        onClick={handleCreateMedicine}
        className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none mb-4"
      >
        Create Medicine
      </button>
      
      <button
        onClick={handleViewMedicineRequests}
        className="w-64 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition focus:outline-none"
      >
        Read Medicine
      </button>
    </div>
  );
};

export default MoDashboard;
