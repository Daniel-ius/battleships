import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"


function App() {
    const [board, setBoard] = useState([])
    const [shots, setShots] =useState(25)
    const [score, setScore]=useState(0)
    const [game_over, setGame_over]=useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3001/board")
            .then((res)=>setBoard(res.data))
    }, []);
    useEffect(()=>{
        axios
            .get("http://localhost:3001/shots")
            .then((res)=>setShots(res.data.shots))

        axios
            .get("http://localhost:3001/score")
            .then((res) => setScore(res.data.score))


        axios
            .get("http://localhost:3001/gameover")
            .then((res) => setGame_over(res.data.game_over))
    },[board])

    const Check_Move=(x,y)=>{
        axios
            .post("http://localhost:3001/move", {
                x: x,
                y: y,
            })
            .then((res) => {
                setBoard(res.data.board)
                setShots(res.data.shots);
                setScore(res.data.score);
                setGame_over(res.data.game_over);
            })
    }
    return (
    <div className="App">
        <h2>Laivų Mūšis</h2>
        <h4>Shots left: {shots}</h4>
        <h4>Score: {score}</h4>
        {game_over?(<div>Game over</div>):(
                <table>
                    <tbody>
                    {board.map((row,i)=>(
                        <tr key={i}>
                            {row.map((cell,j)=>(
                                <td key={j}
                                    onClick={()=>Check_Move(i,j)}
                                    className={cell === 0 ? "water" : cell === 1 ? "hit" : cell === 2 ? "miss" : "ship"}
                                ></td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
        )}
    </div>
    )
}

export default App
