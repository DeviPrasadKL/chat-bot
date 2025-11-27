# Node + React AI Chatbot

This project uses ONLY:
- React frontend
- Node.js backend
- Hugging Face Inference API (no Python)

---

## Setup Steps

### 1. Node backend
```
cd node-backend
npm install
echo "HF_API_KEY=your_key" > .env
node server.js
```

### 2. React frontend
```
cd frontend
npm install
npm run build
npm start
```

Open browser: **http://localhost:3000**

---

### How It Works
React → Node → HuggingFace → Node → React

