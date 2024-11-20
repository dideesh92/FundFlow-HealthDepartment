const { clientApplication } = require('./client'); // Import client application

// Initialize the client application
let userClient = new clientApplication();

// Request ID to query the verified and forwarded voucher
const requestId = "Req-101"; // Unique identifier for the medicine request

// Query the chaincode function
userClient.submitTxn(
    "DMO",                          // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "queryTxn",                     // Transaction type
    "",                             // Empty string (if unused)
    "queryMedicineRequest",         // Chaincode function name for querying the voucher
    requestId                       // Request ID of the medicine request
).then(result => {
    console.log("Query Result:");
    console.log(new TextDecoder().decode(result)); // Decoding the result buffer to string
}).catch(error => {
    console.error("Error querying voucher:", error);
});