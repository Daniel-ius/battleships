import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/message")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div className="container">
            <div className="grid grid-computer">{message}</div>
        </div>
    );
}
export default App;
