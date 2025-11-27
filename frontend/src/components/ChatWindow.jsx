import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  messages,
  input,
  setInput,
  loading,
  sendMessage,
  chatEndRef,
}) {
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        width: "95vw",
        margin: "auto",
      }}
    >
      <h2>AI Chatbot (Llama 3)</h2>

      <MessagesList messages={messages} loading={loading} chatEndRef={chatEndRef} />

      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
