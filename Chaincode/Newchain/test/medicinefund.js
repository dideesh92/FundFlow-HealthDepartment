'use strict';

const { Context } = require('fabric-contract-api');
const { ChaincodeStub } = require('fabric-shim');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const MedicineRequestChaincode = require('../lib/Medicinefund'); // Update with your file path

describe('MedicineRequestChaincode Tests', () => {
  let contract;
  let ctx;
  let stub;

  beforeEach(() => {
    contract = new MedicineRequestChaincode();
    ctx = sinon.createStubInstance(Context);
    stub = sinon.createStubInstance(ChaincodeStub);
    ctx.stub = stub;
  });

  describe('initLedger()', () => {
    it('should initialize the ledger with the fund pool', async () => {
      await contract.initLedger(ctx);
      sinon.assert.calledOnce(ctx.stub.putState);
      const fundPool = JSON.parse(ctx.stub.putState.firstCall.args[1].toString());
      expect(fundPool.availableFunds).to.equal(100000);
    });
  });

  describe('createMedicineRequest()', () => {
    it('should create a new medicine request', async () => {
      const result = await contract.createMedicineRequest(ctx, 'REQ1', 'Paracetamol', 100);
      const request = JSON.parse(result);

      expect(request.requestId).to.equal('REQ1');
      expect(request.medicineDetails).to.equal('Paracetamol');
      expect(request.quantity).to.equal(100);
      expect(request.status).to.equal('Requested');
      sinon.assert.calledWith(ctx.stub.putState, 'REQ1', Buffer.from(result));
    });
  });

  describe('supplyMedicine()', () => {
    it('should update the request status to Supplied', async () => {
      ctx.stub.getState.withArgs('REQ1').resolves(Buffer.from(JSON.stringify({
        requestId: 'REQ1',
        status: 'Requested'
      })));

      const result = await contract.supplyMedicine(ctx, 'REQ1', 500);
      const updatedRequest = JSON.parse(result);

      expect(updatedRequest.status).to.equal('Supplied');
      expect(updatedRequest.billAmount).to.equal(500);
      sinon.assert.calledWith(ctx.stub.putState, 'REQ1', Buffer.from(result));
    });
  });

  describe('verifyAndForwardVoucher()', () => {
    it('should update the request status to Verified', async () => {
      ctx.stub.getState.withArgs('REQ1').resolves(Buffer.from(JSON.stringify({
        requestId: 'REQ1',
        status: 'Supplied'
      })));

      const result = await contract.verifyAndForwardVoucher(ctx, 'REQ1');
      const updatedRequest = JSON.parse(result);

      expect(updatedRequest.status).to.equal('Verified');
      sinon.assert.calledWith(ctx.stub.putState, 'REQ1', Buffer.from(result));
    });
  });

  describe('approveAndSanctionFunds()', () => {
    it('should approve the request and update the fund pool', async () => {
      // Mock the existing medicine request in a 'Verified' state
      ctx.stub.getState.withArgs('REQ1').resolves(Buffer.from(JSON.stringify({
        requestId: 'REQ1',
        status: 'Verified',
        billAmount: 500
      })));
  
      // Mock the fund pool state with sufficient funds
      ctx.stub.getState.withArgs('fundPool').resolves(Buffer.from(JSON.stringify({
        availableFunds: 100000
      })));
  
      // Run the approveAndSanctionFunds function
      const result = await contract.approveAndSanctionFunds(ctx, 'REQ1');
      const updatedRequest = JSON.parse(result);
  
      // Verify that the request status was updated to 'Approved and Funded'
      expect(updatedRequest.status).to.equal('Approved and Funded');
      expect(updatedRequest.approvedBy).to.equal('DHS');
  
      // Verify that putState was called to update the fund pool with reduced funds
      const fundPoolUpdate = JSON.parse(ctx.stub.putState.secondCall.args[1].toString());
      expect(fundPoolUpdate.availableFunds).to.equal(99500);
  
      // Verify putState was called to save the updated medicine request
      sinon.assert.calledWith(ctx.stub.putState, 'REQ1', Buffer.from(JSON.stringify(updatedRequest)));
    });
  });
  

  describe('queryMedicineRequest()', () => {
    it('should return a medicine request', async () => {
      ctx.stub.getState.withArgs('REQ1').resolves(Buffer.from(JSON.stringify({
        requestId: 'REQ1',
        medicineDetails: 'Paracetamol',
        quantity: 100,
        status: 'Requested'
      })));

      const result = await contract.queryMedicineRequest(ctx, 'REQ1');
      const request = JSON.parse(result);

      expect(request.requestId).to.equal('REQ1');
      expect(request.medicineDetails).to.equal('Paracetamol');
      expect(request.quantity).to.equal(100);
    });
  });

  describe('queryFundPool()', () => {
    it('should return the current fund pool', async () => {
      ctx.stub.getState.withArgs('fundPool').resolves(Buffer.from(JSON.stringify({
        availableFunds: 100000
      })));

      const result = await contract.queryFundPool(ctx);
      const fundPool = JSON.parse(result);

      expect(fundPool.availableFunds).to.equal(100000);
    });
  });
});
