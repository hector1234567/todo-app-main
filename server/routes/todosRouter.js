import { Router } from "express";
import db from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.user.id);
  res.json(todos);
});

router.post("/", (req, res) => {
  const { text, completed = false } = req.body;
  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }
  db.prepare(
    "INSERT INTO todos (text, completed, user_id) VALUES (?, ?, ?)",
  ).run(text, completed ? 1 : 0, req.user.id);
  res.status(201).json({ message: "Todo created" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM todos WHERE id = ? AND user_id = ?").run(
    id,
    req.user.id,
  );
  res.json({ message: "Todo deleted" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed, createdAt } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  db.prepare(
    "UPDATE todos SET text = ?, completed = ?, created_at = ? WHERE id = ? AND user_id = ?",
  ).run(text, completed ? 1 : 0, createdAt, id, req.user.id);
  res.json({ message: "Todo updated" });
});

export default router;
