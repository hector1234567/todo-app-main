import { Router } from "express";
import db from "../db.js";

const testKey = process.env.TEST_KEY || "default_test_key";

const router = Router();

router.get("/todos/" + testKey, (req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all();
  res.json(todos);
});

router.get("/users/" + testKey, (req, res) => {
  const users = db
    .prepare("SELECT * FROM users ORDER BY created_at DESC")
    .all();
  res.json(users);
});

export default router;
