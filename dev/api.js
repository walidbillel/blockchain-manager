const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const Blockchain = require('./blockchain');
const PORT = 3000;
const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));


// fetching all the blockchain 
app.get("/blockchain", function (req, res) {
    // bitcoin.createNewTransaction(20, "sfdsfsdfsdfsd", "ssdfwef5wef5wef")
    res.send(bitcoin);
});

// Endpoint to create a new transaction
app.post("/transaction", function (req, res) {
    // Creating the transaction from the browser
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}. `})
});

// Endppint to mine a new block
app.get("/mine", function (req, res) {


    
    // To mine a block we need to create a new block
    // We need to find our params
    // Last Block 
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
    const currentBlockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
    
     // Creating a new Block to mine the previous one 
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentBlockHash);

    res.json({
        data: currentBlockData,
        nonce: nonce, 
        hash: currentBlockHash,
        // newBlock: newBlock
    });

   
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});