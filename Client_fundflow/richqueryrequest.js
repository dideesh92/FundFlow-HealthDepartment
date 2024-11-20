const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "MO",                           // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "richqueryrequest",                     // Transaction type (query)
    "",                             // Empty string (if unused)
    "queryMedicineRequestsByStatus", // Chaincode function name for querying by status
    "Requested"                     // Status to query
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Medicine requests retrieved successfully");
}).catch(error => {
    console.error("Error retrieving medicine requests by status:", error);
});
