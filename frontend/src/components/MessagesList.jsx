import ReactMarkdown from "react-markdown";

export default function MessagesList({ messages, loading, chatEndRef }) {
  return (
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
            <ReactMarkdown>{m.text}</ReactMarkdown>
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
  );
}
