import React, { useState } from 'react';

const MedicineRequests = () => {
    const [status, setStatus] = useState('Requested'); // Default status
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            const response = await fetch(`/api/medicineRequests?status=${status}`);
            if (!response.ok) {
                throw new Error('Failed to fetch medicine requests.');
            }
            const data = await response.json();
            setRequests(data.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setError('Failed to fetch medicine requests.');
            setRequests([]);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Medicine Requests</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
                    className="border p-2 rounded mr-2"
                />
                <button
                    onClick={fetchRequests}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Fetch Requests
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-4">
                {requests.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Request ID</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{request.requestId}</td>
                                    <td className="border px-4 py-2">{request.status}</td>
                                    <td className="border px-4 py-2">{JSON.stringify(request.details)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No medicine requests found for the status "{status}".</p>
                )}
            </div>
        </div>
    );
};

export default MedicineRequests;
