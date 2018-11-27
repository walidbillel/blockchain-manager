const sha256 = require("sha256");


// Our Constructor Function
function Blockchain() {

    this.chain = [];
    this.pendingTransactions = [];
}

// prototype function for creating a new block
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    // creating a new block object
    const newBlock = {
        index: this.chain.length + 1,
        timeStamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    // Clearing out the transactions for the next block
    this.pendingTransactions = [];

    // Pushing the new block created to the chain 
    this.chain.push(newBlock);

    // Return the new block
    return newBlock;
}

// prototype function for returning the last block
Blockchain.prototype.returnLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

// prototype function for creating a new transaction
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    
    // Create a transaction object 
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    // Pushing the new transaction created to the transactions
    this.pendingTransactions.push(newTransaction);

    
    return this.returnLastBlock()['index'] + 1;
}


Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
   
    // Concatenate the params into a single string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);

    return hash;
}

module.exports = Blockchain;