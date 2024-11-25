const { clientApplication } = require('./client');

let userClient = new clientApplication();

// Function to invoke 'approveAndSanctionFunds' chaincode function
userClient.submitTxn(
    "DHS",                          // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "approveAndSanctionFunds",      // Chaincode function name
    "Req-101"                       // Request ID of the medicine request to approve and sanction
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Funds approved and sanctioned successfully");
}).catch(error => {
    console.error("Error approving and sanctioning funds:", error);
});

