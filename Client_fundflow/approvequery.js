const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "DHS",                          // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "queryMedicineRequest",         // Chaincode function name
    "Req-101"                       // Request ID of the medicine request to query
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Medicine request details retrieved successfully");
}).catch(error => {
    console.error("Error querying medicine request:", error);
});



