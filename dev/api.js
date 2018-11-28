const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));


// fetching all the blockchain 
app.get("/blockchain", function (req, res) {
    
});

// Endpoint to create a new transaction
app.post("/transaction", function (req, res) {
    res.send('it works')
});

// Endppint to mine a new block
app.get("/mine", function (req, res) {
    res.send('hello world')
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});