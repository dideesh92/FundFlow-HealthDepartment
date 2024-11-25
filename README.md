Fund Flow Management System in Health Department using Hyperledger Fabric
Objective
The objective of this project is to create a blockchain-based fund flow management system for the health department using Hyperledger Fabric. The system ensures secure, transparent, and corruption-free fund distribution to beneficiaries, enabling traceability and accountability in all transactions.

Built With
This project utilizes the following technologies and tools:

Hyperledger Fabric (v3.7): Framework for building enterprise-grade blockchain networks.
Docker: For containerized deployment of peers, orderers, and other network components.
Node.js: Backend development for chaincode interactions.
Fabric CA: To manage identity and access control in the network.
Fabric SDK: For application development and connecting with the Fabric network.
Postman: For testing API endpoints during development.
Key Features
Transparent Fund Management: Immutable ledger records all fund-related transactions, ensuring transparency.
Role-Based Access: Specific roles like Customer, MO, DMO, and DHS are defined to control actions in the network.
Automated Verification: Smart contracts validate fund requests, reducing manual intervention.
Traceability: End-to-end tracking of requests and disbursements builds trust and accountability.
Tamper-Proof Data: Blockchain ensures that transaction data cannot be altered or deleted.
Efficient Workflow: Automation accelerates the request and approval processes.
How It Works
Network Setup
A Hyperledger Fabric network is deployed with four organizations: Customer, MO, DMO, and DHS. Each organization has one peer, and there is a single orderer for maintaining transaction order.
Certificate Authority (CA) manages identity issuance and role-based permissions.
Fund Request Workflow
Request Submission:
Customers submit fund requests with required details and documents. These requests are recorded on the blockchain.

Verification:

The Medical Officer (MO) verifies the authenticity of the request and updates its status on the blockchain.
Approval:

The District Medical Officer (DMO) reviews and approves or rejects the verified request. Approved requests proceed to DHS for fund sanctioning.
Fund Disbursement:

The Directorate of Health Services (DHS) sanctions funds for approved requests, and the transaction is recorded on the blockchain.
Audit and Reporting:

Authorized users can generate audit reports and review the complete transaction history to ensure compliance and proper utilization of funds.
