'use strict';

const { Contract } = require('fabric-contract-api');

class MedicineRequestChaincode extends Contract {


  async initLedger(ctx) {
    const fundPool = {
      availableFunds: 100000
    };
    await ctx.stub.putState('fundPool', Buffer.from(JSON.stringify(fundPool)));
    console.info('Ledger initialized with fund pool:', fundPool);
  }


  async createMedicineRequest(ctx, requestId, medicineDetailsString, quantityString) {
    const medicineDetails = JSON.parse(medicineDetailsString); // Parse medicineDetails back into an object
    const quantity = parseInt(quantityString); // Convert quantity back to a number

    const medicineRequest = {
      requestId,
      medicineDetails,
      quantity,
      assetType: 'medicine',
      status: 'Requested',
      requestedBy: 'MO',
      suppliedBy: '',
      verifiedBy: '',
      approvedBy: ''
    };

    await ctx.stub.putState(requestId, Buffer.from(JSON.stringify(medicineRequest)));
    console.info('Medicine request created:', medicineRequest);
    return JSON.stringify(medicineRequest);
  }



  async supplyMedicine(ctx, requestId, billAmount) {
    const medicineRequestAsBytes = await ctx.stub.getState(requestId);
    if (!medicineRequestAsBytes || medicineRequestAsBytes.length === 0) {
      throw new Error(`${requestId} does not exist`);
    }

    const medicineRequest = JSON.parse(medicineRequestAsBytes.toString());
    if (medicineRequest.status !== 'Requested') {
      throw new Error(`Medicine request ${requestId} is not in requested state`);
    }

    medicineRequest.status = 'Supplied';
    medicineRequest.suppliedBy = 'MEDICINESUPPLYAGENCY';
    medicineRequest.billAmount = billAmount;

    await ctx.stub.putState(requestId, Buffer.from(JSON.stringify(medicineRequest)));
    console.info('Medicine supplied with bill:', medicineRequest);
    return JSON.stringify(medicineRequest);
  }


  async verifyAndForwardVoucher(ctx, requestId) {
    const medicineRequestAsBytes = await ctx.stub.getState(requestId);
    if (!medicineRequestAsBytes || medicineRequestAsBytes.length === 0) {
      throw new Error(`${requestId} does not exist`);
    }

    const medicineRequest = JSON.parse(medicineRequestAsBytes.toString());
    if (medicineRequest.status !== 'Supplied') {
      throw new Error(`Medicine request ${requestId} is not in supplied state`);
    }

    medicineRequest.status = 'Verified';
    medicineRequest.verifiedBy = 'DMO';

    await ctx.stub.putState(requestId, Buffer.from(JSON.stringify(medicineRequest)));
    console.info('Voucher verified and forwarded:', medicineRequest);
    return JSON.stringify(medicineRequest);
  }





  async voucherExist(ctx, voucherId) {
    const collectionName = 'OrderCollection';
    const data = await ctx.stub.getPrivateDataHash(collectionName, voucherId);
    return (!!data && data.length > 0);
  }

  async createVoucher(ctx, voucherId) {
    const mspid = ctx.clientIdentity.getMSPID();
    if (mspid === 'DHSMSP') {
      const exists = await this.voucherExist(ctx, voucherId);
      if (exists) {
        throw new Error(`${voucherId} already exists`);
      }
      const voucherAsset = {};
      const transientData = ctx.stub.getTransient();
      if (transientData.size === 0 || !transientData.has("requestId") || !transientData.has("amount")) {
        throw new Error("The expected key was not specified in transient data. Please try again.");
      }
      voucherAsset.requestId = transientData.get("requestId").toString();
      voucherAsset.amount = transientData.get("amount").toString();
      voucherAsset.assetType = "voucher";
      voucherAsset.status = "approved";
      const collectionName = 'OrderCollection';
      await ctx.stub.putPrivateData(collectionName, voucherId, Buffer.from(JSON.stringify(voucherAsset)));
    } else {
      return `Organization with MSP ID ${mspid} cannot perform this action`;
    }
  }

  async readVoucher(ctx, voucherId) {
    const exists = await this.voucherExist(ctx, voucherId);
    if (!exists) {
      throw new Error(`The order ${voucherId} does not exist`);
    }
    const collectionName = 'OrderCollection';
    const privateData = await ctx.stub.getPrivateData(collectionName, voucherId);
    return JSON.parse(privateData.toString());
  }


  async queryMedicineRequest(ctx, requestId) {
    const medicineRequestAsBytes = await ctx.stub.getState(requestId);
    if (!medicineRequestAsBytes || medicineRequestAsBytes.length === 0) {
      throw new Error(`${requestId} does not exist`);
    }
    return medicineRequestAsBytes.toString();
  }


  //rich query


  async queryMedicineRequestsByStatus(ctx, status) {
    const queryString = {
      selector: {
        status: status, // Dynamically filter by provided status
      },
    };

    const resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const results = await this._getAllResults(resultIterator);
    return JSON.stringify(results); // Return JSON stringified data
  }

  // Utility function to process query results
  async _getAllResults(iterator) {
    const results = [];
    let res = await iterator.next();

    while (!res.done) {
      if (res.value) {
        const Key = res.value.key;
        const Record = JSON.parse(res.value.value.toString('utf8'));
        results.push({ Key, Record });
      }
      res = await iterator.next();
    }

    await iterator.close(); // Ensure iterator is closed
    return results;
  }

// working richquery

  async queryAllmedicine(ctx) {
    const queryString = {
        selector: {
            assetType: 'medicine'
        }
    };
    let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    let result = await this._getAllResults(resultIterator);
    return JSON.stringify(result)
}

 
}

module.exports = MedicineRequestChaincode;
