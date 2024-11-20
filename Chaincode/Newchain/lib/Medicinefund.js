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

  async approveAndSanctionFunds(ctx, requestId) {
    const medicineRequestAsBytes = await ctx.stub.getState(requestId);
    if (!medicineRequestAsBytes || medicineRequestAsBytes.length === 0) {
      throw new Error(`${requestId} does not exist`);
    }
    
    const medicineRequest = JSON.parse(medicineRequestAsBytes.toString());
    if (medicineRequest.status !== 'Verified') {
      throw new Error(`Medicine request ${requestId} is not in verified state`);
    }

    const fundPoolAsBytes = await ctx.stub.getState('fundPool');
    const fundPool = JSON.parse(fundPoolAsBytes.toString());

    if (fundPool.availableFunds < medicineRequest.billAmount) {
      throw new Error(`Insufficient funds to sanction for request ${requestId}`);
    }

    fundPool.availableFunds -= medicineRequest.billAmount;
    await ctx.stub.putState('fundPool', Buffer.from(JSON.stringify(fundPool)));

    medicineRequest.status = 'Approved and Funded';
    medicineRequest.approvedBy = 'DHS';

    await ctx.stub.putState(requestId, Buffer.from(JSON.stringify(medicineRequest)));
    console.info('Funds sanctioned and acknowledged:', medicineRequest);
    return JSON.stringify(medicineRequest);
  }

  async queryMedicineRequest(ctx, requestId) {
    const medicineRequestAsBytes = await ctx.stub.getState(requestId);
    if (!medicineRequestAsBytes || medicineRequestAsBytes.length === 0) {
      throw new Error(`${requestId} does not exist`);
    }
    return medicineRequestAsBytes.toString();
  }

  async queryFundPool(ctx) {
    const fundPoolAsBytes = await ctx.stub.getState('fundPool');
    if (!fundPoolAsBytes || fundPoolAsBytes.length === 0) {
      throw new Error(`Fund pool does not exist`);
    }
    return fundPoolAsBytes.toString();
  }

  //rich query

  async queryMedicineRequestsByStatus(ctx, status) {
    const queryString = {
        selector: {
            status: 'Requested'
        }
    };

    const queryResults = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
    return queryResults;
}

async getQueryResultForQueryString(ctx, queryString) {
    const iterator = await ctx.stub.getQueryResult(queryString);
    const results = [];
    let res = await iterator.next();

    while (!res.done) {
        const record = res.value.value.toString('utf8');
        results.push(JSON.parse(record));
        res = await iterator.next();
    }
    await iterator.close();
    return JSON.stringify(results);
}

}

module.exports = MedicineRequestChaincode;
