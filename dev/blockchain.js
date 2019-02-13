// Sha256 npm For Hashing

const sha256 = require("sha256");
const uuid = require('uuid/v1');
const currentNodeUrl = process.argv[3];

// Building the Blockchain Constructor Function
function Blockchain() {


    this.chain = [];
    this.pendingTransactions = [];
    // The current url the blockchain is on
    this.currentNodeUrl = currentNodeUrl;
    // All the nodes in the blockchain
    this.networkNodes = [];
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
        recipient: recipient,
        transactionId: uuid().split('-').join('')
    };

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {

    this.pendingTransactions.push(transactionObj);

    return this.getLastBlock().index + 1
};

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

Blockchain.prototype.chainIsValid = function(blockchain) {

    let validChain = true;

    for (var i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const previousBlock = blockchain[i - 1];

        const blockHash = this.hashBlock(previousBlock.hash, {transactions: currentBlock.transactions, index: currentBlock.index}, currentBlock.nonce);
        if (blockHash.substr(0, 4) !== '0000') validChain = false;
        if (currentBlock.previousBlockHash !== previousBlock.hash) validChain = false;

        console.log('previousBlockHash => ', previousBlock.hash)
        console.log('currentBlockHash => ', currentBlock.hash);
        
    };

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock.nonce === 1000;
    const correctPrevBlockHash = genesisBlock.previousBlockHash === '1';
    const correctHash = genesisBlock.hash === '0';
    const correctTransactions = genesisBlock.transactions.length === 0;

    if (!correctNonce || !correctPrevBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;

};


Blockchain.prototype.getBlock = function(blockHash) {

    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) {
            correctBlock = block;
        }
    });

    return correctBlock;
};



Blockchain.prototype.getTransaction = function(transactionId) {

    let correctTransaction = null;
    let correctBlock = null;

    this.chain.forEach(block => {
        //......Iterate thru transactions
        block.transactions.forEach(transaction => {
            //..getting all transactions
            if (transaction.transactionId === transactionId) {
                //...Indicate that correct transaction
                correctTransaction = transaction;
                correctBlock = block;
            }
        });
    });

    return {
        transaction: correctTransaction,
        block: correctBlock
    }
}

module.exports = Blockchain;