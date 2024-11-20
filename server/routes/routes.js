const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");


router.post("/createMedicineRequest", async (req, res) => {
    try {
        const { requestId, medicineDetails, quantity } = req.body;

        let userClient = new clientApplication();

        const result = await userClient.submitTxn(
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
        );

        res.status(201).json({
            success: true,
            message: "created successfully!",
            data: { result },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Please check the  ID!",
            data: { error },
        });
    }
});


router.post("/readMedicine", async (req, res) => {
    try {
        const { requestId } = req.body;
        let userClient = new clientApplication();
        let med = await userClient.submitTxn(
            "MO",                           // Organization ID or role
            "fundchannel",                  // Channel name
            "FundFlowHD",                   // Network/contract namespace
            "MedicineRequestChaincode",     // Chaincode name
            "queryTxn",                     // Transaction type
            "",                             // Empty string (if unused)
            "queryMedicineRequest",         // Chaincode function name for querying the request
            requestId                       // Request ID to query the medicine request
        );
        const data = new TextDecoder().decode(med);
        const value = JSON.parse(data);

        res.status(200).json({
            success: true,
            message: "data read successfully!",
            data: { value },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Please check the ID!",
            data: { error },
        });
    }
});


router.post("/supplyMedicine", async (req, res) => {
    try {
        const { requestId, amount } = req.body;

        let userClient = new clientApplication();

        const result = await userClient.submitTxn(
            "MO",                           // Organization ID or role
            "fundchannel",                  // Channel name
            "FundFlowHD",                   // Network/contract namespace
            "MedicineRequestChaincode",     // Chaincode name
            "invokeTxn",                    // Transaction type
            "",                             // Empty string (if unused)
            "supplyMedicine",               // Chaincode function name for supplying medicine
            requestId,                      // Request ID of the medicine
            amount                           // Bill amount
        );

        res.status(201).json({
            success: true,
            message: "created successfully!",
            data: { result },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Please check the  ID!",
            data: { error },
        });
    }
});


router.post("/verifyVoucher", async (req, res) => {
    try {
        const { requestId } = req.body;

        let userClient = new clientApplication();

        const result = await userClient.submitTxn(
            "DMO",                          // Organization ID or role
            "fundchannel",                  // Channel name
            "FundFlowHD",                   // Network/contract namespace
            "MedicineRequestChaincode",     // Chaincode name
            "invokeTxn",                    // Transaction type
            "",                             // Empty string (if unused)
            "verifyAndForwardVoucher",      // Chaincode function name
            requestId                       // Request ID of the medicine request to verify
        );

        res.status(201).json({
            success: true,
            message: "created successfully!",
            data: { result },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Please check the  ID!",
            data: { error },
        });
    }
});






module.exports = router;