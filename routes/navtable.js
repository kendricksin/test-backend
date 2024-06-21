const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/database.sqlite');

// Create table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS navtable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Distance INTEGER,
      Mark1 TEXT,
      Mark2 TEXT,
      Mark3 TEXT,
      Mark4 TEXT
    )
  `);
});

// Get all rows
router.get('/', (req, res) => {
  db.all('SELECT * FROM navtable', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Insert a new row
router.post('/', (req, res) => {
  const { Distance, Mark1, Mark2, Mark3, Mark4 } = req.body;
  db.run(
    'INSERT INTO navtable (Distance, Mark1, Mark2, Mark3, Mark4) VALUES (?, ?, ?, ?, ?)',
    [Distance, Mark1, Mark2, Mark3, Mark4],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;
