
// Our Constructor Function
function Blockchain () {
    this.chain = [];
    this.newTransactions = [];
}

// prototype function for creating a new block
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    // creating a new block object
    const newBlock = {
        index: this.chain.length + 1,
        timeStamp: Date.now(), 
        transactions: this.newTransactions,
        nonce: nonce,
        
    }
}