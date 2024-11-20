const { clientApplication } = require('./client'); // Import client application

// Initialize the client application
let userClient = new clientApplication();

// Details of the medicine request
const requestId = "Req-101"; // Unique identifier for the medicine request
const medicineDetails = JSON.stringify({
    name: "Paracetamol", // Example medicine name
    manufacturer: "Pharma Inc.", // Manufacturer details
    expiryDate: "2025-12-31" // Expiry date
});
const quantity = "500"; // Quantity of the medicine being requested

// Invoke the chaincode function
userClient.submitTxn(
    "MO",                           // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "createMedicineRequest",        // Chaincode function name for creating the request
    requestId,                      // Request ID of the medicine request
    medicineDetails,                // Medicine details as a string
    quantity                        // Quantity as a string
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding the result buffer to string
    console.log("Medicine request created successfully");
}).catch(error => {
    console.error("Error creating medicine request:", error);
});
