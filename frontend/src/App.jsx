import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // Add the user message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const reply = data.reply || "I could not generate a response.";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error: Could not contact the AI server." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        width: 900,
        margin: "auto",
      }}
    >
      <h2>AI Chatbot (Llama 3)</h2>

      {/* Chat window */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 500,
          overflowY: "scroll",
          marginBottom: 10,
          borderRadius: 8,
          background: "#f8f8f8",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <p
              style={{
                background: m.role === "user" ? "#3a3f42" : "#6d5f49",
                color: "white",
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 10,
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {m.text}
            </p>
          </div>
        ))}

        {loading && (
          <p style={{ fontStyle: "italic", color: "#555" }}>
            Bot is typing…
          </p>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input + Send */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: 350,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "8px 16px",
            marginLeft: 10,
            borderRadius: 6,
            background: "#3a3f42",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
