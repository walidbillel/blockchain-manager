const Blockchain = require('./blockchain');

const bitCoin = new Blockchain()

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

console.log(bitCoin.hashBlock(previousBlockHash, currentBlockData, 8893));



// console.log(bitCoin.hashBlock("dsadasdasdasd", 222, "555555555555555555"))