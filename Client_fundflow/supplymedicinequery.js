const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "MO",                           // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "queryTxn",                     // Transaction type
    "",                             // Empty string (if unused)
    "queryMedicineRequest",         // Chaincode function name for querying a specific medicine request
    "Req-101"                       // Request ID of the medicine to query
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Medicine request details retrieved successfully");
}).catch(error => {
    console.error("Error retrieving medicine request details:", error);
});
