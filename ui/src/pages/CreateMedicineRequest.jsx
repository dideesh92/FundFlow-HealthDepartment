import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateMedicineRequest = () => {
  const [requestId, setRequestId] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    // Create the medicineDetails object
    const medicineDetails = JSON.stringify({
      name: medicineName,
      manufacturer: manufacturer,
      expiryDate: expiryDate,
    });

    const newMedicineRequest = {
      requestId,
      medicineDetails, // Send as a string
      quantity,
    };

    addMedicineRequest(newMedicineRequest);
  };

  const addMedicineRequest = async (newMedicineRequest) => {
    try {
      const res = await fetch('/api/createMedicineRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicineRequest),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`${result.message}`);
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("Error: Unable to create medicine request.");
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center py-10 px-4 bg-gray-50">
        <div className="max-w-lg w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Medicine Request
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
                Medicine Name
              </label>
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Paracetamol"
                required
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Pharma Inc."
                required
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 500"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
            >
              Create Medicine Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateMedicineRequest;
