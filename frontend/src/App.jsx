import { useState, useEffect, useRef } from "react";
import ChatWindow from "./components/ChatWindow";
import VRChatRoom from "./components/VRChatRoom";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vrMode, setVrMode] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error contacting AI server." },
      ]);
    }

    setLoading(false);
  }

  // Switch UI when VR is active
  if (vrMode) {
    return (
      <div>
        <button
          onClick={() => setVrMode(!vrMode)}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 999 }}
        >
          Exit VR
        </button>

        <VRChatRoom messages={messages} />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setVrMode(!vrMode)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 16px",
          borderRadius: 6,
          background: "#6d5f49",
          color: "white",
          cursor: "pointer",
        }}
      >
        {vrMode ? "Exit VR" : "Enter VR"}
      </button>

      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        loading={loading}
        sendMessage={sendMessage}
        chatEndRef={chatEndRef}
      />
    </>
  );
}

export default App;
