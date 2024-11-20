import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    // Navigating to the corresponding page based on the role
    switch (role) {
      case 'customer':
        navigate('/cusDashboard');
        break;
      case 'mo':
        navigate('/moDashboard');
        break;
      case 'dmo':
        navigate('/DmoDashboard');
        break;
      case 'dhs':
        navigate('/dhs');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Select Your Role</h2>
      <div className="space-y-4">
        <button
          onClick={() => handleNavigation('customer')}
          className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          Customer
        </button>
        <button
          onClick={() => handleNavigation('mo')}
          className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          MO
        </button>
        <button
          onClick={() => handleNavigation('dmo')}
          className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          DMO
        </button>
        <button
          onClick={() => handleNavigation('dhs')}
          className="w-64 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          DHS
        </button>
      </div>
    </div>
  );
};

export default Homepage;
