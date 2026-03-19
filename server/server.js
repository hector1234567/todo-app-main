import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import morgan from "morgan";

import todosRouter from "./routes/todosRouter.js";
import authRouter from "./routes/authRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(join(__dirname, "../")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);
app.use("/api/auth", authRouter);

app.get("/api/{*splat}", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
