const express = require("express");
const cors=require("cors")
const PORT = 3001;
const app = express();
app.use(express.json())
app.use(cors())

let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let ships = [
    { length: 1, count: 4 },
    { length: 2, count: 3 },
    { length: 3, count: 2 },
    { length: 4, count: 1 },
    { length: 5, count: 1 }
];


app.get('/board', (req, res) => {
    res.send(board);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


