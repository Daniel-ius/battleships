const express = require("express")
const cors = require("cors")
const PORT = 3001;
const app = express()
app.use(express.json())
app.use(cors())

let game = {
    board: createBoard(),
    game_over: false,
    shots: 25,
    score: 0,
    message: "start"
}

function restartGame() {
    game.board = createBoard()
    game.game_over = false
    game.shots = 25
    game.score = 0
    game.message = "start"
}

app.get('/board', (req, res) => {
    restartGame()
    res.send(game)
});
app.post('/move', (req, res) => {
    let x = req.body.x
    let y = req.body.y
    let result = playerMove(x, y)
    game.game_over = result.game_over
    game.board = result.board
    game.shots = result.shots
    game.score = result.score
    res.json(game)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});

function createBoard() {
    let board = new Array(10)
    for (let i = 0; i < 10; i++) {
        board[i] = new Array(10)
        for (let j = 0; j < 10; j++) {
            board[i][j] = 0
        }
    }
    generateShips(board)
    return board
}

function playerMove(x, y) {
    if (game.shots <= 0) {
        game.message = "You Lost"
        game.game_over = true
        return game
    }
    if (game.board[x][y] === 0) {
        game.message = "miss"
        game.board[x][y] = 2
        game.shots--
        game.game_over = false
        return game
    } else if (game.board[x][y] === 1) {
        game.message = "hit"
        game.board[x][y] = -1
        game.score++;
        if (winCheck()) {
            game.game_over = true
            game.message = "You won"
            return game
        }
        game.game_over = false
        return game
    }
}

function generateShips(board) {
    let ships = [
        {length: 1, count: 4},
        {length: 2, count: 3},
        {length: 3, count: 2},
        {length: 4, count: 1},
        {length: 5, count: 1}
    ];
    for (let i = 0; i < ships.length; i++) {
        let ship = ships[i]
        for (let j = 0; j < ship.count; j++) {
            let placed = false
            while (!placed) {
                let x = Math.floor(Math.random() * 10)
                let y = Math.floor(Math.random() * 10)
                let rotation = Math.random() < 0.5
                if (shipCanBePlaced(board, x, y, ship.length, rotation)) {
                    placeShipOnTheBoard(board, x, y, ship.length, rotation)
                    placed = true
                }
            }
        }
    }
}

function placeShipOnTheBoard(board, x, y, length, rotation) {
    if (rotation) {
        for (let i = x; i < x + length; i++) {
            board[i][y] = 1
        }
    } else {
        for (let i = y; i < y + length; i++) {
            board[x][i] = 1
        }
    }
}

function shipCanBePlaced(board, x, y, length, rotation) {
    if (rotation) {
        if (x + length > 10) {
            return false;
        } else {
            for (let i = x - 1; i < x + length + 1; i++) {
                for (let j = y - 1; j < y + 1; j++) {
                    if (j >= 0 && j < 10 && i >= 0 && i < 10 && board[i][j] !== 0) {
                        return false;
                    }
                }
            }
        }
    } else {
        if (y + length > 10) {
            return false;
        } else {
            for (let i = y - 1; i < y + length + 1; i++) {
                for (let j = x - 1; j < x + 1; j++) {
                    if (j >= 0 && j < 10 && i >= 0 && i < 10 && board[j][i] !== 0) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function winCheck() {
    return game.score === 25
}

