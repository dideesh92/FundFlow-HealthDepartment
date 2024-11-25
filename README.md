# **Fund Flow Management System in Health Department**

## **Objective**
The goal of this project is to develop a secure and transparent blockchain-based fund flow management system using **Hyperledger Fabric**. The system ensures proper fund distribution to beneficiaries, eliminating corruption and enhancing accountability.

---

## **Built With**
The project uses the following technologies and tools:
- **Hyperledger Fabric v3.7**: Framework for building enterprise-grade permissioned blockchain networks.
- **Docker**: For deploying network components such as peers, orderers, and certificate authorities in isolated environments.
- **Node.js**: Backend development and interaction with the blockchain network.
- **Fabric SDK**: To facilitate application interaction with the Fabric network.
- **Fabric CA**: Identity management and role-based access control for the network.
- **Postman**: For testing API endpoints during development.

---

## **Key Features**
1. **Transparent Fund Management**: All fund-related transactions are recorded on an immutable blockchain ledger.
2. **Role-Based Access Control**: Defined roles (Customer, MO, DMO, DHS) ensure secure access to specific functions.
3. **Automated Workflows**: Smart contracts streamline fund request submission, verification, and approval processes.
4. **Traceability**: Complete history of transactions ensures easy tracking and auditing.
5. **Tamper-Proof Records**: Blockchain technology prevents unauthorized data manipulation.
6. **Efficiency**: Automation reduces delays and ensures timely disbursement of funds.

---

## **How It Works**

### **Network Architecture**
The Hyperledger Fabric network consists of:
- **Four organizations**:
  - **Customer**: Requests funds.
  - **Medical Officer (MO)**: Verifies the requests.
  - **District Medical Officer (DMO)**: Approves verified requests.
  - **DHS (Directorate of Health Services)**: Sanctions funds for approved requests.
- **Orderer Node**: Maintains the chronological order of transactions.

### **Workflow**
1. **Fund Request Submission**:  
   A beneficiary (Customer) submits a fund request along with necessary details and documents.

2. **Verification by Medical Officer (MO)**:  
   The MO reviews the request and updates its status on the blockchain.

3. **Approval by District Medical Officer (DMO)**:  
   The DMO evaluates verified requests and approves or rejects them based on eligibility and fund availability.

4. **Fund Sanctioning by DHS**:  
   Approved requests are processed by DHS, which disburses funds directly to the beneficiary.

5. **Audit and Reporting**:  
   All transactions are logged for auditing and compliance purposes.

---

Feel free to contribute to this project or raise issues for improvements! 😊
