import { Router } from "express";
import db from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all();
  res.json(todos);
});

router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  res.json({ message: "Todo deleted" });
});

export default router;
