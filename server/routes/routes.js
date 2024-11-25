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

// Route to query medicine requests by status
router.get('/medicineRequests', async (req, res) => {
    try {
        const { status } = req.query; // Get the status from query parameters
        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const userClient = new clientApplication();

        const result = await userClient.submitTxn(
            "MO",                          // Organization ID or role
            "fundchannel",                 // Channel name
            "FundFlowHD",                  // Network/contract namespace
            "MedicineRequestChaincode",    // Chaincode name
            "queryTxn",                 // Transaction type for queries
            "",                            // Empty string (if unused)
            "queryMedicineRequestsByStatus", // Chaincode function name
            status                         // Status to query
        );

        res.status(200).json({
            success: true,
            data: JSON.parse(result), // Parse the result before sending
        });
    } catch (error) {
        console.error('Error querying medicine requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to query medicine requests',
            error: error.message,
        });
    }
});



router.post("/createVoucher", async (req, res) => {
    const { voucherId, requestId, amount } = req.body;
    let userClient = new clientApplication();
    if (!voucherId || !requestId || !amount) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const transientData = {
            requestId: Buffer.from(requestId),
            amount: Buffer.from(amount),
        };
        console.log("transient data", transientData);

        const result = await userClient.submitTxn(
            "DHS",
            "fundchannel",
            "FundFlowHD",
            "MedicineRequestChaincode",
            "privateTxn",
            transientData,
            "createVoucher",
            voucherId
        );

        res.status(200).json({ message: "created successfully.", result: new TextDecoder().decode(result) });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating.", error: error.message });
    }
});


router.get("/readVoucher", async (req, res) => {
    // const { voucherId } = req.body;
    const { voucherId } = req.query;
    let userClient = new clientApplication();

    try {
        const result = await userClient.submitTxn(
            "DHS",
            "fundchannel",
            "FundFlowHD",
            "MedicineRequestChaincode",
            "queryTxn",
            "",
            "readVoucher",
            voucherId
        );

        const decodedResult = new TextDecoder().decode(result);
        res.status(200).json(JSON.parse(decodedResult));
    } catch (error) {
        console.error("Error reading :", error);
        res.status(500).json({ message: `Error reading  ${voucherId}.`, error: error.message });
    }
});


router.post("/queryAllmedicine", async (req, res) => {
    try {
        let uClient = new clientApplication();
        let medi = await uClient.submitTxn(
            "MO",                           // Organization ID or role
            "fundchannel",                  // Channel name
            "FundFlowHD",                   // Network/contract namespace
            "MedicineRequestChaincode",
            "queryTxn",
            "",
            "queryAllmedicine"
        );
        const data = new TextDecoder().decode(medi);
        const value = JSON.parse(data);

        res.status(200).json({
            success: true,
            message: "data query successfully!",
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






module.exports = router;