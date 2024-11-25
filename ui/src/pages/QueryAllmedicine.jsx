import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllmedicine = () => {
  const [medicineData, setMedicineData] = useState(null);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const res = await fetch("/api/queryAllmedicine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setMedicineData(result.data.value); // Access the "value" array directly
          toast.success("Medicine data retrieved successfully");
        } else {
          toast.error("No medicine data found");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the medicine data");
      }
    };

    fetchMedicineData();
  }, []);

  const parseMedicineDetails = (details) => {
    try {
      // Check if details is already an object
      return typeof details === "string" ? JSON.parse(details) : details;
    } catch {
      return null; // Return null if parsing fails
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-transparent p-8 rounded-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          All Medicines
        </h2>

        {/* Display medicine data in a table format if data is available */}
        {medicineData && medicineData.length > 0 ? (
          <div className="overflow-x-auto bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Medicine Data
            </h3>
            <table className="min-w-full border border-blue-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="px-4 py-2 border-b border-blue-300">Medicine ID</th>
                  <th className="px-4 py-2 border-b border-blue-300">Name</th>
                  <th className="px-4 py-2 border-b border-blue-300">Manufacturer</th>
                  <th className="px-4 py-2 border-b border-blue-300">Quantity</th>
                  <th className="px-4 py-2 border-b border-blue-300">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {medicineData.map((medicine, index) => {
                  const details = parseMedicineDetails(medicine.Record.medicineDetails);
                  return (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border-b border-blue-300">{medicine.Key}</td>
                      <td className="px-4 py-2 border-b border-blue-300">
                        {details ? details.name : "Invalid Data"}
                      </td>
                      <td className="px-4 py-2 border-b border-blue-300">
                        {details ? details.manufacturer : "Invalid Data"}
                      </td>
                      <td className="px-4 py-2 border-b border-blue-300">{medicine.Record.quantity}</td>
                      <td className="px-4 py-2 border-b border-blue-300">
                        {details ? details.expiryDate : "Invalid Data"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-4">
              No Medicine Data Found
            </h3>
            <p className="text-gray-700">
              There is no medicine data available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryAllmedicine;
