const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "MO",                           // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "supplyMedicine",               // Chaincode function name for supplying medicine
    "Req-101",                      // Request ID of the medicine
    "500"                           // Bill amount
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Medicine supplied successfully");
}).catch(error => {
    console.error("Error supplying medicine:", error);
});
