const Blockchain = require('./blockchain');

const bitCoin = new Blockchain();

// console.log(bitCoin)

const previousBlockHash = '05das5das5d5asd5';
const currentBlockData = [
    {
        amount: 14,
        sender: "sdfdsfsdf445sd45fsd",
        recipient: "sfdsf44455sd5f5sd4d2d2"
    },
    {
        amount: 154,
        sender: "sdfdsfsdf445sd45fsd",
        recipient: "sfdsf5sd5f5sd4d2d2"
    },
    {
        amount: 204,
        sender: "sdfdsfsdf445sd45fsd",
        recipient: "sfdsf5sd5f5sd4d2d2"
    },
];

// bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');
console.log(bitCoin.createNewBlock(14, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3'));

console.log(bitCoin)


// bitCoin.createNewBlock(20, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');

// bitCoin.createNewTransaction(400, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");

// bitCoin.createNewTransaction(100, "55454ds6a4d54a6w", "6484asd84q9d4qwds3d1q");

// bitCoin.createNewBlock(20, 'asfas5f5asfas45f45a', 'asfasfjakhkew5a3');

// console.log(bitCoin);

// console.log(bitCoin.proofOfWork(previousBlockHash, currentBlockData));

// bitCoin.createNewBlock(77, "ssfdsfds", "qwdqwdqwd");
// bitCoin.getLastBlock()

