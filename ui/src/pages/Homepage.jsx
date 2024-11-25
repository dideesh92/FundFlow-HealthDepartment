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
        navigate('/dmoDashboard');
        break;
      case 'dhs':
        navigate('/dhsDashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10">
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        FundFlow in Health Department
      </h1>
      <h2 className="text-2xl font-bold text-center text-white mb-8">
        Select Your Role
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => handleNavigation('customer')}
          className="w-64 py-9 bg-blue-200 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          Customer
        </button>
        <button
          onClick={() => handleNavigation('mo')}
          className="w-64 py-9 bg-blue-200 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          MO
        </button>
        <button
          onClick={() => handleNavigation('dmo')}
          className="w-64 py-9 bg-blue-200 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          DMO
        </button>
        <button
          onClick={() => handleNavigation('dhs')}
          className="w-64 py-9 bg-blue-200 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
        >
          DHS
        </button>
      </div>
    </div>
  );
};

export default Homepage;
