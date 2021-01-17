// const router = require("./candidateRoutes");
const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// route for all parties
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
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

// route for single party
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
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

// route to delete party
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, request) {
        if (err) {
            return res.status(400).json({error: res.message });
        }
        res.json({
            message: 'successfully deleted', 
            changes: this.changes
        });
    });
});

module.exports = router;