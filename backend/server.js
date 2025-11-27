import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running!" });
});

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;

  if (!messages || !messages.length) {
    return res.json({ reply: "Please provide messages." });
  }

  // Convert frontend format → HF format
  const hfMessages = messages.map((m) => ({
    role: m.role === "bot" ? "assistant" : m.role,
    content: m.text,
  }));

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: "You are an assistant that always responds in English.",
            },
            ...hfMessages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );

    const text = await response.text();
    console.log("\n--- RAW HF RESPONSE ---\n", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.json({ reply: "HuggingFace returned invalid JSON." });
    }

    if (data.error) return res.json({ reply: data.error });

    // Extract reply
    let botReply = null;
    const choice = data.choices?.[0];

    if (Array.isArray(choice?.message?.content)) {
      botReply = choice.message.content
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("\n");
    }

    if (!botReply) {
      botReply =
        choice?.message?.content ||
        choice?.delta?.content ||
        data.generated_text ||
        (Array.isArray(data) ? data[0]?.generated_text : null);
    }

    if (botReply) return res.json({ reply: botReply });

    return res.json({ reply: "Unknown HF response format." });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.json({ reply: "Server error contacting HuggingFace." });
  }
});


app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
