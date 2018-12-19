const Blockchain = require("./blockchain");

const bitCoin = new Blockchain();

 const bc1 = {
    "chain": [
    {
    "index": 1,
    "timeStamp": 1545249702189,
    "transactions": [],
    "nonce": 1000,
    "hash": "0",
    "previousBlockHash": "1"
    },
    {
    "index": 2,
    "timeStamp": 1545249731613,
    "transactions": [
    {
    "amount": 200,
    "sender": "fa6fd64f8ds8f61sc51sd35w",
    "recipient": "jnf;jdsvn;dfv68fv8er98ve6f55e",
    "transactionId": "ee9d008003c811e9ba2e4f1ada58bc63"
    },
    {
    "amount": 52,
    "sender": "fa6fd64f8ds8f61sc51sd35w",
    "recipient": "jnf;jdsvn;dfv68fv8er98ve6f55e",
    "transactionId": "f212c65003c811e9ba2e4f1ada58bc63"
    }
    ],
    "nonce": 42373,
    "hash": "0000096742a12f5f52d2bab3a876940124cccd46d1ea952d4782945c77ed3c0f",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timeStamp": 1545249745046,
    "transactions": [
    {
    "amount": 15,
    "sender": "000",
    "recipient": "e7632dd003c811e9ba2e4f1ada58bc63",
    "transactionId": "f8eec19003c811e9ba2e4f1ada58bc63"
    }
    ],
    "nonce": 88494,
    "hash": "0000379f66c6f0b5cc4ca84acc683fa29a4299b3e90cd704c49dc7024399ecde",
    "previousBlockHash": "0000096742a12f5f52d2bab3a876940124cccd46d1ea952d4782945c77ed3c0f"
    },
    {
    "index": 4,
    "timeStamp": 1545249759488,
    "transactions": [
    {
    "amount": 15,
    "sender": "000",
    "recipient": "e7632dd003c811e9ba2e4f1ada58bc63",
    "transactionId": "00ef189003c911e9ba2e4f1ada58bc63"
    },
    {
    "amount": 10,
    "sender": "fa6fd64f8ds8f61sc51sd35w",
    "recipient": "jnf;jdsvn;dfv68fv8er98ve6f55e",
    "transactionId": "05d3b0a003c911e9ba2e4f1ada58bc63"
    },
    {
    "amount": 5,
    "sender": "fa6fd64f8ds8f61sc51sd35w",
    "recipient": "jnf;jdsvn;dfv68fv8er98ve6f55e",
    "transactionId": "07dec2e003c911e9ba2e4f1ada58bc63"
    }
    ],
    "nonce": 8148,
    "hash": "000029e95554ad830593a332558cb249a77193dd6f67bac6f4cf83fc34654dde",
    "previousBlockHash": "0000379f66c6f0b5cc4ca84acc683fa29a4299b3e90cd704c49dc7024399ecde"
    },
    {
    "index": 5,
    "timeStamp": 1545249761286,
    "transactions": [
    {
    "amount": 15,
    "sender": "000",
    "recipient": "e7632dd003c811e9ba2e4f1ada58bc63",
    "transactionId": "098a9e2003c911e9ba2e4f1ada58bc63"
    }
    ],
    "nonce": 399271,
    "hash": "000062bc9ca7600339b43fe443fc113182db94fc54817bf0c3406a89c39e5bba",
    "previousBlockHash": "000029e95554ad830593a332558cb249a77193dd6f67bac6f4cf83fc34654dde"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 15,
    "sender": "000",
    "recipient": "e7632dd003c811e9ba2e4f1ada58bc63",
    "transactionId": "0a9cd17003c911e9ba2e4f1ada58bc63"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

console.log('Valid: ', bitCoin.chainIsValid(bc1.chain));

// console.log(bitCoin)

// const previousBlockHash = '05das5das5d5asd5';
// const currentBlockData = [
//     {
//         amount: 14,
//         sender: "sdfdsfsdf445sd45fsd",
//         recipient: "sfdsf44455sd5f5sd4d2d2"
//     },
//     {
//         amount: 154,
//         sender: "sdfdsfsdf445sd45fsd",
//         recipient: "sfdsf5sd5f5sd4d2d2"
//     },
//     {
//         amount: 204,
//         sender: "sdfdsfsdf445sd45fsd",
//         recipient: "sfdsf5sd5f5sd4d2d2"
//     },
// ];

// // bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');
// console.log(bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3'));
// bitCoin.createNewTransaction(400, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");
// console.log(bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3'));
// bitCoin.createNewTransaction(400, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");
// console.log(bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3'));
// console.log(bitCoin)

// // bitCoin.createNewBlock(20, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');

// // bitCoin.createNewTransaction(400, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");

// // bitCoin.createNewTransaction(100, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");

// // bitCoin.createNewBlock(20, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');

// // console.log(bitCoin);

// // console.log(bitCoin.proofOfWork(previousBlockHash, currentBlockData));

// // bitCoin.createNewBlock(77, "ssfdsfds", "qwdqwdqwd");
// console.log(bitCoin.getLastBlock())
