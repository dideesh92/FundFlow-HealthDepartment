import React from 'react';
import { useNavigate } from 'react-router-dom';

const DmoDashboard = () => {
  const navigate = useNavigate();

  const handleVerifyVoucher = () => {
    // Navigate to the verify voucher page
    navigate('/verifyVoucher');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">DMO Dashboard</h2>

      <button
        onClick={handleVerifyVoucher}
        className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
      >
        Verify Voucher
      </button>
    </div>
  );
};

export default DmoDashboard;
