const { clientApplication } = require('./client'); // Import the client application

// Initialize the client application
let userClient = new clientApplication();

// Request ID to approve and sanction funds
const requestId = "Req-101"; // Unique identifier for the medicine request

// Invoke the chaincode function
userClient.submitTxn(
    "DHS",                          // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "approveAndSanctionFunds",      // Chaincode function name
    requestId                       // Request ID of the medicine request
).then(result => {
    console.log("Result:");
    console.log(new TextDecoder().decode(result)); // Decoding the result buffer to string
    console.log("Funds approved and sanctioned successfully.");
}).catch(error => {
    console.error("Error approving and sanctioning funds:", error);
});
