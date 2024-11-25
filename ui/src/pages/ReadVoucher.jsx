import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadVoucher = () => {
  const [voucherId, setVoucherId] = useState("");
  const [voucherData, setVoucherData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!voucherId) {
      toast.error("Please enter a Voucher ID");
      return;
    }

    try {
      const res = await fetch(`/api/readVoucher?voucherId=${voucherId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (res.ok) {
        setVoucherData(result);
        toast.success("Voucher data retrieved successfully");
      } else {
        toast.error(result.message || `Voucher ID ${voucherId} does not exist`);
        setVoucherData(null);
      }
    } catch (error) {
      toast.error("An error occurred while fetching the voucher data");
      console.error("Fetch error:", error);
    }
  };

  const resetForm = () => {
    setVoucherId("");
    setVoucherData(null);
  };

  return (
    <div className="bg-gradient-to-b from-green-300 to-green-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Read Voucher
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label
              htmlFor="voucherId"
              className="block text-gray-700 font-semibold mb-2"
            >
              Voucher ID
            </label>
            <input
              type="text"
              id="voucherId"
              name="voucherId"
              value={voucherId}
              onChange={(e) => setVoucherId(e.target.value)}
              placeholder="Enter Voucher ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Read
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Render voucher details if available */}
        {voucherData && (
          <div className="mt-6 p-4 bg-green-50 border rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Voucher Details
            </h3>
            <ul className="text-gray-800">
              {Object.entries(voucherData).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadVoucher;
