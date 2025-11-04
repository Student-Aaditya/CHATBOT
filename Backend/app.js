require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5498;
const { spawn } = require("child_process");
const cors = require("cors");
const responses = require("./config/data.js");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatbot-ef9j.onrender.com"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chatbot backend is running 🚀");
});

app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const python = spawn("python", ["model_python/predict_intent.py", userMessage]);

  python.stdout.on("data", (data) => {
    const intent = data.toString().trim();
    let response = responses[intent] || responses.default;

    // 🧠 Dynamic logic for hostel fees
    if (intent === "hostel") {
      const yearMatch = userMessage.match(/(\d)(st|nd|rd|th)?\s*year/);
      const roomMatch = userMessage.match(/single|double|triple|four/);
      const acMatch = userMessage.match(/ac|non-?ac/);

      if (yearMatch && roomMatch && acMatch) {
        const year = parseInt(yearMatch[1]);
        const roomType = roomMatch[0];
        const acType = acMatch[0].includes("non") ? "NonAC" : "AC";
        const fees = responses.hostelFees?.[acType]?.[year]?.[roomType];

        if (fees) {
          response = `The hostel fee for a **${year} year ${roomType}-seater ${acType.replace(
            "AC",
            "AC"
          )} room** is ₹${fees.toLocaleString()}/year.`;
        } else {
          response = "Sorry, I couldn’t find that specific room fee. Please check your query.";
        }
      } else if (yearMatch && roomMatch) {
        // Default to Non-AC if AC/Non-AC not mentioned
        const year = parseInt(yearMatch[1]);
        const roomType = roomMatch[0];
        const fees = responses.hostelFees.NonAC?.[year]?.[roomType];

        response = fees
          ? `The hostel fee for a **${year} year ${roomType}-seater (Non-AC)** room is ₹${fees.toLocaleString()}/year.`
          : "Sorry, I couldn’t find that specific room fee.";
      }
    }

    if (!res.headersSent) {
      res.json({ intent, response });
    }
  });

  python.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    if (!res.headersSent) {
      res.status(500).json({ error: "Model error" });
    }
  });

  python.on("close", (code) => {
    if (!res.headersSent && code !== 0) {
      res.status(500).json({ error: "Python process exited unexpectedly" });
    }
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
