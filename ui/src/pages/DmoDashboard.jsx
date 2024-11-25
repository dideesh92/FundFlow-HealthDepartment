import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DmoDashboard = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Requested'); // Default status
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    const handleVerifyVoucher = () => {
        // Navigate to the verify voucher page
        navigate('/verifyVoucher');
    };

    const fetchRequests = async () => {
        try {
            const response = await fetch(`/api/medicineRequests?status=${status}`);
            if (!response.ok) {
                throw new Error('Failed to fetch medicine requests.');
            }
            const data = await response.json();
            // Adjusted to handle the new structure from the chaincode
            setRequests(data || []); 
            setError(null);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setError('Failed to fetch medicine requests.');
            setRequests([]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-white via-green-200 to-orange-100 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">DMO Dashboard</h2>

            {/* Verify Voucher Button */}
            <button
                onClick={handleVerifyVoucher}
                className="w-64 py-3 mb-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition focus:outline-none"
            >
                Verify Voucher
            </button>

            {/* Medicine Requests Section */}
            <div className="p-4 w-full max-w-4xl bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Medicine Requests</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Enter status"
                        className="border p-2 rounded mr-2 flex-grow"
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
                                    <th className="border px-4 py-2">Key</th>
                                    <th className="border px-4 py-2">Request ID</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{request.Key}</td>
                                        <td className="border px-4 py-2">{request.Record.requestId}</td>
                                        <td className="border px-4 py-2">{request.Record.status}</td>
                                        <td className="border px-4 py-2">{JSON.stringify(request.Record.details)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No medicine requests found for the status "{status}".</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DmoDashboard;
