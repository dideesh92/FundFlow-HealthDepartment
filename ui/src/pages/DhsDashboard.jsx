import React from 'react';
import { useNavigate } from 'react-router-dom';

const DhsDashboard = () => {
  const navigate = useNavigate();

  const handleCreateVoucher = () => {
    navigate('/createVoucher'); // Replace with your route for creating a voucher
  };

  const handleReadVoucher = () => {
    navigate('/readVoucher'); // Replace with your route for reading a voucher
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-700 to-green-100 text-white">
      {/* Navigation */}
      <nav className="bg-green-300 p-4 shadow-md">
        {/* <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DHS Dashboard</h1>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => navigate('/')}
                className="hover:text-gray-300 transition"
              >
                Home
              </button>
            </li>
          </ul>
        </div> */}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-3xl font-semibold mb-6">Welcome to DHS Dashboard</h2>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleCreateVoucher}
            className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Create Voucher
          </button>
          <button
            onClick={handleReadVoucher}
            className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Read Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default DhsDashboard;
