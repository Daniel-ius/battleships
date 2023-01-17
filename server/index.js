const express = require("express");
const cors=require("cors")
const PORT = 3001;
const app = express();
app.use(express.json())
app.use(cors())

let board=createBoard()
let game_over=false
let shots=25
let score=0



app.get('/board', (req, res) => {
    res.send(board);
});
app.post('/move', (req,res)=>{
    let x=req.body.x
    let y=req.body.y
    let result=Player_Move(x,y)
    board[x][y]=result.hit ? 1 : 2;
    res.json({board:result.board,shots: result.shots, score: result.score, game_over: result.game_over});
})
app.get("/shots",(req,res)=>{
    res.json({shots});
})
app.get("/score",(req,res)=>{
    res.json({score});
})
app.get("/gameover",(req,res)=>{
    res.json({game_over})
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
function createBoard() {
    let board = new Array(10);
    for (let i = 0; i < 10; i++) {
        board[i] = new Array(10)
        for (let j = 0; j < 10; j++) {
            board[i][j] = 0;
        }
    }
    generateShips(board);
    return board;
}
function  Player_Move(x, y){
    if(shots<=0){
        game_over=true
    }
    if(board[x][y]===0){
        board[x][y]=2
        shots--;
        return { board, shots, score, game_over: false};
    }else if (board[x][y]===1){
        board[x][y]=1;
        score++;
        if(winCheck()){
            return { board, shots, score, game_over: true };
        }
        return { board, shots, score, game_over: false};
    }
}
function generateShips(board){
    let ships = [
        { length: 1, count: 4 },
        { length: 2, count: 3 },
        { length: 3, count: 2 },
        { length: 4, count: 1 },
        { length: 5, count: 1 }
    ];
    for (let i=0;i<ships.length;i++){
        let ship=ships[i]
        for(let j=0; j<ship.count;j++){
            let placed=false
            while (!placed){
                let x=Math.floor(Math.random()*10)
                let y=Math.floor(Math.random()*10)
                let rotation=Math.random()<0.5
                if(shipCanBePlaced(board,x,y,ship.length,rotation)){
                    placeShipOnTheBoard(board,x,y,ship.length,rotation)
                    placed = true
                }
            }
        }
    }
}
function placeShipOnTheBoard(board,x,y,length,rotation){
    if(rotation){
        for (let i=x;i<x+length;i++){
            board[i][y]=1
        }
    }else {
        for (let i=y;i<y+length;i++){
            board[x][i]=1
        }
    }
}
function shipCanBePlaced(board, x, y, length, rotation){
    if(rotation){
        if(x+length>10){
            return false
        }
        for(let i=x;i<x+length;i++){
            if(board[i][y]!==0){
                return false
            }
        }
    }else {
        if (y + length > 10) {
            return false
        }
        for (let i = y; i < y + length; i++) {
            if (board[x][i] !== 0) {
                return false
            }
        }
    }
    return true;
}
function winCheck(){
    return score === 25;
}

