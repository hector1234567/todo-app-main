import { verifyToken } from "../jwt.js";

export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token authentication failed:", error);

    res.status(403).json({ error: "Invalid token" });
  }
}
