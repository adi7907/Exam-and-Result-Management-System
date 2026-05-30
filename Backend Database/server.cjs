const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./exam.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY, name TEXT, age INTEGER, maths INTEGER DEFAULT 0, cs INTEGER DEFAULT 0)");
  db.get("SELECT COUNT(*) as count FROM students", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO students (id, name, age) VALUES ('1', 'Sample 1', 19), ('2', 'Sample 2', 18), ('3', 'Sample 3', 20)");
    }
  });
});

app.get('/api/all', (req, res) => db.all("SELECT * FROM students", [], (err, rows) => res.json({ students: rows })));

app.post('/api/students', (req, res) => {
  db.run("INSERT INTO students (id, name, age) VALUES (?, ?, ?)", [req.body.id, req.body.name, req.body.age], () => res.json({ success: true }));
});

app.put('/api/students/:id', (req, res) => {
  db.run(`UPDATE students SET ${req.body.sub} = ? WHERE id = ?`, [req.body.val, req.params.id], () => res.json({ success: true }));
});

// NEW: Wipe Database Route
app.delete('/api/clear', (req, res) => {
  db.run("DELETE FROM students", () => res.json({ success: true }));
});

app.listen(3000, () => console.log('SQL Server running on port 3000'));