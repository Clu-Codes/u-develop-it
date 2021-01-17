const express = require('express');
const db = require('./db/database');

// const { abort } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

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
