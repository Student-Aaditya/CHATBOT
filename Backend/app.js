require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5498;
const { spawn } = require("child_process");
const cors = require("cors");
const path = require("path");
const responses = require("./config/data.js");

// ✅ Enable CORS for frontend (React or Next.js)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite or React local
      "http://localhost:5713", // alternate frontend port
      "http://localhost:3000", // Next.js local
      "https://chatbot-ef9j.onrender.com", // deployed site
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Chatbot backend is running ✅");
});

// ✅ Chat route
app.post("/chat", (req, res) => {
  const userMessage = req.body.userMessage?.toLowerCase() || "";
  console.log("🟢 Received message:", userMessage);

  if (!userMessage) {
    return res.status(400).json({ error: "No message received in request body" });
  }

  const pythonPath = path.join(__dirname, "./model_python/predict_intent.py");
  console.log("🟢 Running Python script:", pythonPath);

  const python = spawn("python", [pythonPath, userMessage]);

  let output = "";
  let errorOutput = "";

  python.stdout.on("data", (data) => {
    console.log("🐍 Python STDOUT:", data.toString());
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error("❌ Python STDERR:", data.toString());
    errorOutput += data.toString();
  });

  python.on("close", (code) => {
    console.log("🐍 Python exited with code:", code);

    if (errorOutput || code !== 0) {
      console.error("❌ Python Error Details:", errorOutput);
      return res.status(500).json({
        error: "Model error",
        detail: errorOutput || `Exited with code ${code}`,
      });
    }

    const intent = output.trim();
    console.log("✅ Predicted intent:", intent);

    const response = responses[intent] || responses.default;
    res.json({ intent, response });
  });
});


// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
