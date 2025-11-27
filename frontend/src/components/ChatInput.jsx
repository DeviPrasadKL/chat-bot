export default function ChatInput({ input, setInput, sendMessage }) {
  return (
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
  );
}
