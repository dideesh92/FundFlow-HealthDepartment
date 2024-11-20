import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SupplyMedicine = () => {
  const [requestId, setRequestId] = useState('');
  const [amount, setAmount] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    const medicineSupplyData = {
      requestId,
      amount,
    };

    supplyMedicine(medicineSupplyData);
  };

  const supplyMedicine = async (medicineSupplyData) => {
    try {
      const res = await fetch('/api/supplyMedicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineSupplyData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`${result.message}`);
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error('Error: Unable to supply medicine.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-4 bg-gray-50">
      <div className="max-w-lg w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Supply Medicine
        </h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Request ID
            </label>
            <input
              type="text"
              id="requestId"
              name="requestId"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Req-101"
              required
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 500"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
          >
            Supply Medicine
          </button>
        </form>
      </div>
    </section>
  );
};

export default SupplyMedicine;
