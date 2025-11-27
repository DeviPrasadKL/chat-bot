# Node + React AI Chatbot

This project implements an AI chatbot with:

* **React frontend** (no Python)
* **Node.js backend**
* **Hugging Face Inference API**

---

## Setup Instructions

### 1️⃣ Node Backend

1. Navigate to the backend folder:

```bash
cd node-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with your Hugging Face API key:

```bash
echo "HF_TOKEN=your_key_here" > .env
```

4. Start the Node server:

```bash
node server.js
```

> The backend will run on `http://localhost:3001` (adjust if different).

---

### 2️⃣ React Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies (**use legacy peer deps if using Drei / R3F**):

```bash
npm install --legacy-peer-deps
```

3. Start the development server:

```bash
npm run dev
```

> Open your browser at **[http://localhost:5173](http://localhost:5173)** (default Vite port).

---

### 3️⃣ How It Works

```
React Frontend → Node.js Backend → Hugging Face API → Node → React Frontend
```

* User types message in React UI
* Frontend sends request to Node backend
* Backend queries Hugging Face Inference API
* Response is sent back to frontend and displayed

---

### 4️⃣ Notes / Tips

* Ensure your **Node.js version ≥ 20** for full compatibility.
* For **VR/3D features with React Three Fiber**, ensure the following versions in `frontend/package.json`:

```json
"dependencies": {
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "@react-three/fiber": "8.17.10",
  "@react-three/drei": "9.122.0",
  "@react-three/xr": "5.6.0",
  "three": "0.152.2"
}
```

* If `ReactCurrentOwner` errors appear, run:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

And add dedupe in `vite.config.js`:

```js
resolve: {
  dedupe: ["react", "react-dom"]
}
```

---

This README now works as a full, modern guide for **Node + React + Hugging Face** projects, with VR/React Three Fiber considerations included.
