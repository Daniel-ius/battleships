import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/board")
            .then((res) => res.json())
            .then((data) => setBoard(data));
    }, []);

    return (
    <div className="App">
        <h2>Laivų Musis</h2>
        <table>
            <tbody>
            {board.map((row,i)=>(
                <tr key={i}>
                    {row.map((cell,j)=>(
                    <td key={j}
                    className={cell}

                    ></td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
        );
}

export default App;
