import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import morgan from "morgan";

import todosRouter from "./routes/todosRouter.js";
import authRouter from "./routes/authRouter.js";
import testRouter from "./routes/testRouter.js";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(join(__dirname, "./public")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);
app.use("/api/auth", authRouter);

// Test routes (remove or protect in production)
app.use("/api/test", testRouter);

app.get("/api/{*splat}", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 3000");
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  db.close();
  process.exit();
});
