const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "MO",                           // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "createMedicineRequest",        // Chaincode function name
    "Req-102",                      // Request ID
    JSON.stringify({                // Medicine details as JSON string
        name: "Citrizin     ",
        dose: "600mg"
    }),
    "100"                           // Quantity as a string
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Medicine request successfully created");
}).catch(error => {
    console.error("Error creating medicine request:", error);
});
