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
  const userMsg = req.body.message;

  if (!userMsg) return res.json({ reply: "Please type something." });

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are an assistant that always responds in English." },
          { role: "user", content: userMsg }
        ],
        max_tokens: 200,
        temperature: 0.7
      }),
    });

    const text = await response.text();
    console.log("Raw HF Response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.json({ reply: "Error: HuggingFace returned non-JSON." });
    }

    if (data.error) return res.json({ reply: `HF Error: ${data.error}` });

    // ✅ Correct Llama /chat/completions response
    const botReply = data.choices?.[0]?.message?.content;

    if (botReply) return res.json({ reply: botReply });

    return res.json({ reply: "Unknown HF response format." });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.json({ reply: "Server error contacting HuggingFace." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
