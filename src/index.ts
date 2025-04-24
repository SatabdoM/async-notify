import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("🚀 Async Notify Server is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
