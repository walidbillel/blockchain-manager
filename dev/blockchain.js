// Sha256 npm For Hashing

const sha256 = require("sha256");


// Building the Blockchain Constructor Function
function Blockchain() {


    this.chain = [];
    this.pendingTransactions = [];

    // Generting The Genesis Block (the first block in the chain)
    this.createNewBlock(1000, '1', '0');
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

    // console.log(newBlock)

    // Clearing out the transactions for the next block
    this.pendingTransactions = [];

    // Pushing the new block created to the chain 
    this.chain.push(newBlock);

    // Return the new block
    return newBlock;
}

// prototype function for returning the last block
Blockchain.prototype.getLastBlock = function () {

    // returning the last block to retreive the previous hash and some data
    return this.chain[this.chain.length - 1];

}

// prototype function for creating a new transaction
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {

    // Create a new transaction object 
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    // Pushing the new transaction created to the pending transactions
    this.pendingTransactions.push(newTransaction);

    // console.log(this.getLastBlock()['index'] + 1)
    // Returning the index where the transactions will be found
    return this.getLastBlock()['index'] + 1;
}

// prototype function for hashing a block by concatenating 3 params into a string and the hashing the string
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {

    // Concatenate the params into a single string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    // Hashing the string created using SHA256 npm
    const hash = sha256(dataAsString);

    // Returning the hash that will be used to create the new hash
    return hash;
}


// Proof of Work function to validate the blocks
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {

    // We need to find a hash that starts with 0000
    // We will change our nonce everytime and run the hashBlock function 
    // Until the hash returned starts with four zeros '0000.....'
    // Then we Return the nonce used to find the hash that starts with '0000....'
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    // Using a While loop to generate hashes until finding the correct one
    while (hash.substring(0, 4) !== "0000") {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    }

    // Return the nonce that will be used to create a new block
    return nonce;
}

module.exports = Blockchain;