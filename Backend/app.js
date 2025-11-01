require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT;
const {spawn} =require("child_process");
const cors=require("cors");
const responses=require("./config/data.js");
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello");
})
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  const python = spawn("python", ["../model_python/predict_intent.py", userMessage]);


  python.stdout.on("data", (data) => {
    const intent = data.toString().trim();

    const response = responses[intent] || responses.default;
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

app.listen(port,()=>{
    console.log(`server working on ${port}`);
})