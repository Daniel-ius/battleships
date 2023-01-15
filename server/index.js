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
let game_over=false
let shots=25
let score=0
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
app.post('/move', (req,res)=>{
    res.json(Player_Move(req.body.x,req.body.y));
})
app.get("/shots",(req,res)=>{
    res.json({shots});
})
app.get("/score",(req,res)=>{
    res.json({score});
})
app.get("/gameover",(req,res)=>{
    res.json({gameover: game_over})
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function Player_Move(x, y){
    if(board[x][y]===0){
        shots--;
        if(shots===0){
            game_over=true;
            return{ message:"Game over"}
        }
        board[x][y]=-1;
        return {message:"Miss",shots};
    }else if (board[x][y]===1){
        score++;
        if(winCheck()){
            game_over=true;
            return {message: "Won",shots };
        }
        return { message: "Hit", shots };
    }
}

function winCheck(){
    return score === 25;
}

