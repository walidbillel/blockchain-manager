
// Setting up the servers
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const Blockchain = require('./blockchain');
const PORT = process.argv[2];
const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();

// Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// fetching all the blockchain 
app.get("/blockchain", function (req, res) {
    console.log('test')
    // Sending the bitcoin
    res.send(bitcoin);
    console.log(nodeAddress)
});

// Endpoint to create a new transaction
app.post("/transaction", function (req, res) {
    // Creating the transaction from the browser
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added in block ${blockIndex}. ` });
    
});

// Endppint to mine a new block
app.get("/mine", function (req, res) {

    // To mine a block we need to create a new block
    // We need to find our params
    // Last Block cacascasc
    console.log('test2')

    const lastBlock = bitcoin.getLastBlock();

    // Retreiving the previous block hash
    const previousBlockHash = lastBlock.hash;

    // Current Block Data
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock.index + 1
    };

    // Calculating the nonce for the new block
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

    // Claculating the Hash for the new block
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);


    // Sending Rewarding Bitcoin to the Node who mined the block
    bitcoin.createNewTransaction(15, "00", nodeAddress);

    
    // Creating a new Block to mine the previous one 
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    // console.log(newBlock)

    res.json({
        // previousBlockHash: previousBlockHash,
        // currentBlockData: currentBlockData,

        note: 'Block Successfully Mined',
        newBlock: newBlock
    });

})


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

