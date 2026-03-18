import Database from "better-sqlite3";

const db = new Database("database.db");

// Crear tablas al iniciar
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    text    TEXT    NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// db.exec(`
//     INSERT INTO todos (text, completed) VALUES
//     ('Learn JavaScript', FALSE),
//     ('Build a to-do app', TRUE),
//     ('Master React', FALSE)
// `);

export default db;
