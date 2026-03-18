import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(join(__dirname, "../")));

app.get("/api/todos", (req, res) => {
  const todos = [
    { id: 1, text: "Learn JavaScript", completed: false },
    { id: 2, text: "Build a to-do app", completed: true },
    { id: 3, text: "Master React", completed: false },
  ];
  res.json(todos);
});

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
