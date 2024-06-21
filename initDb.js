const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./db/database.sqlite');

// Create table and insert sample data
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
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
      insertSampleData();
    }
  });
});

// Function to insert sample data
function insertSampleData() {
  const sampleData = [
    { Distance: 10, Mark1: 'AAA', Mark2: 'BBB', Mark3: 'CCC', Mark4: 'DDD' },
    { Distance: 9, Mark1: 'EEE', Mark2: 'FFF', Mark3: 'GGG', Mark4: 'HHH' },
    { Distance: 8, Mark1: 'III', Mark2: 'JJJ', Mark3: 'KKK', Mark4: 'LLL' },
    // Add more sample data as needed
  ];

  sampleData.forEach((row) => {
    db.run(
      'INSERT INTO navtable (Distance, Mark1, Mark2, Mark3, Mark4) VALUES (?, ?, ?, ?, ?)',
      [row.Distance, row.Mark1, row.Mark2, row.Mark3, row.Mark4],
      function (err) {
        if (err) {
          console.error('Error inserting sample data:', err.message);
        }
      }
    );
  });

  console.log('Sample data inserted.');
}

// Close the database connection after the operations are complete
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
