const { clientApplication } = require('./client');

let userClient = new clientApplication();

userClient.submitTxn(
    "DMO",                          // Organization ID or role
    "fundchannel",                  // Channel name
    "FundFlowHD",                   // Network/contract namespace
    "MedicineRequestChaincode",     // Chaincode name
    "invokeTxn",                    // Transaction type
    "",                             // Empty string (if unused)
    "verifyAndForwardVoucher",      // Chaincode function name
    "Req-101"                       // Request ID of the medicine request to verify
).then(result => {
    console.log(new TextDecoder().decode(result)); // Decoding result buffer to string
    console.log("Voucher verified and forwarded successfully");
}).catch(error => {
    console.error("Error verifying and forwarding voucher:", error);
});
