import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [requestId, setRequestId] = useState("");
  const [medicineData, setMedicineData] = useState(null);

  const handleSupplyMedicine = () => {
    navigate("/supplyMedicine");
  };

  const handleViewAllMedicines = () => {
    navigate("/queryAllMedicine");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = { requestId };

    try {
      const res = await fetch("/api/readMedicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readDetails),
      });

      const result = await res.json();
      if (result.success) {
        setMedicineData(result.data.value);
        toast.success("Medicine data retrieved successfully");
      } else {
        toast.error(`Medicine ID ${requestId} does not exist`);
      }
    } catch (error) {
      toast.error("An error occurred while fetching the medicine data");
    }
  };

  const resetForm = () => {
    setRequestId("");
    setMedicineData(null);
  };

  const renderMedicineDetails = () => {
    if (!medicineData) return null;

    return (
      <div className="mt-6 w-full bg-gray-50 rounded-lg shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Medicine Details
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              {Object.entries(medicineData).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="px-4 py-2 font-semibold text-gray-700 capitalize bg-gray-100">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {typeof value === "object" && value !== null ? (
                      <table className="w-full border-collapse mt-2">
                        <tbody>
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <tr key={subKey}>
                              <td className="px-4 py-1 font-medium text-gray-600 capitalize bg-gray-50">
                                {subKey.replace(/([A-Z])/g, " $1")}
                              </td>
                              <td className="px-4 py-1 text-gray-600">
                                {subValue}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-white via-violet-500 to-orange-100 py-10">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Customer Dashboard
      </h2>

      <button
        onClick={handleSupplyMedicine}
        className="w-64 py-3 mb-8 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
      >
        Supply Medicine
      </button>

      <button
        onClick={handleViewAllMedicines}
        className="w-64 py-3 mb-8 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition focus:outline-none"
      >
        View All Medicines
      </button>

      {/* Read Medicine Request Section */}
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Read Medicine Request
        </h3>
        <form onSubmit={submitForm}>
          <div className="mb-6">
            <label
              htmlFor="requestId"
              className="block text-gray-700 font-semibold mb-2"
            >
              Request ID
            </label>
            <input
              type="text"
              id="requestId"
              name="requestId"
              className="w-full px-4 py-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              placeholder="e.g., Req-01"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Read
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>

        {renderMedicineDetails()}
      </div>
    </div>
  );
};

export default CustomerDashboard;
