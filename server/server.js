import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import morgan from "morgan";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(join(__dirname, "../")));
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/todos", (req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all();
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text, completed = false } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  db.prepare("INSERT INTO todos (text, completed) VALUES (?, ?)").run(
    text,
    completed ? 1 : 0,
  );
  res.status(201).json({ message: "Todo created" });
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  res.json({ message: "Todo deleted" });
});

app.get("/api/{*splat}", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
