import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [input, setInput] = useState("");
    const [responses, setResponses] = useState([]);

    const sendMessage = async () => {
        try {
            const response = await axios.post(`http://localhost:8888/chatbot`, {
                message: input,
            });

            setResponses([...responses, response.data.message]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
        setInput("");
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Envoyer</button>
            <div>
                {responses.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    );
}

export default Chatbot;
