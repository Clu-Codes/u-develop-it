const express = require('express');
// verbose produces messages in the terminal regarding the state of the runtime to help explain what the application is doing. 
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to databse
const db = new sqlite3.Database('db/election.db', err => {
    if (err) {
        return console.log(err.message);
    }

    console.log('Connected to the election database.');
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
db.run(sql, params, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
});

// Delete a candidate
// app.delete('api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
//     db.run(sql, params, function(err, result) {
//         if (err) {
//             return res.status(400).json({ error: res.message });
//         }
//         res.json({
//             message: 'successfully deleted',
//             changes: this.changes
//         });
//     });
// });
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({
        message: 'successfully deleted',
        changes: this.changes
      });
    });
  });


// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
            WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Default response for any other request (Not Found) Catch all **Must be last or will override other routes**
app.use((req, res) => {
    res.status(404).end();
});

// Start server after Db connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
})
