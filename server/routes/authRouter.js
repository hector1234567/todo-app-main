import { Router } from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        message: "Login successful",
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(
      username,
      hashedPassword,
    );
    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

export default router;
