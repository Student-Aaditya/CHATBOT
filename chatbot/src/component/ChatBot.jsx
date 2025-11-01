import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5498/chat", { message });
    setChat([...chat, { from: "user", text: message }, { from: "bot", text: res.data.response }]);
    setMessage("");
  };

  return (
    <div style={{ width: "1200px", margin: "23px" }}>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
            <p><b>{msg.from}:</b> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "75%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
