
// Setting up the servers
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const Blockchain = require('./blockchain');
const PORT = process.argv[2];
const rp = require('request-promise');

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

app.post('/transaction/broadcast', function(req, res){

    //    create a new transaction 
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    
    bitcoin.addTransactionToPendingTransactions(newTransaction);
    // Broadcast to all nodes
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: "POST",
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then( data => {

        res.json({
            note: 'Transaction Created and Broadcasted Successfully.'
        })
    });
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

});

// Register and Broadcast the node to the entire network
app.post('/register-and-broadcast-node', function(req, res){ 
    // The new Node url that will be added to the network
    const newNodeUrl = req.body.newNodeUrl;
    // Pushing the new Node to the networkNodes if it's not there
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

    const regNodesPromises = [];
    // Broadcast the new Node to all other Nodes
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        // hit '/register-node' and send 
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl},
            json: true
        }


       regNodesPromises.push(rp(requestOptions));
    });

    Promise.all(regNodesPromises).then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        }

        return rp(bulkRegisterOptions);

    }).then( data => {
        res.json({ note: 'New Node registered with network successfully.'})
    });
});

// Register a node with the network
app.post('/register-node', function(req, res){

    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);

    res.json({
        note: 'New node registered successfully.'
    });
});


// register Bulk network
app.post('/register-nodes-bulk', function(req, res){

    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });

    res.json({
        note: "Bulk Successfully Registered."
    });
});


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

