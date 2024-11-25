import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateVoucher = () => {
  const [formData, setFormData] = useState({
    voucherId: "",
    requestId: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.voucherId || !formData.requestId || !formData.amount) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/createVoucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Voucher created successfully.");
        console.log("Backend Response:", result);
      } else {
        toast.error(result.message || "Failed to create voucher.");
        console.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred while creating the voucher.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white flex flex-col items-center justify-center">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Voucher</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="voucherId" className="block text-gray-700 font-semibold mb-2">
              Voucher ID
            </label>
            <input
              type="text"
              id="voucherId"
              name="voucherId"
              value={formData.voucherId}
              onChange={handleChange}
              placeholder="Enter Voucher ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="requestId" className="block text-gray-700 font-semibold mb-2">
              Request ID
            </label>
            <input
              type="text"
              id="requestId"
              name="requestId"
              value={formData.requestId}
              onChange={handleChange}
              placeholder="Enter Request ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Create Voucher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVoucher;
