const express = require('express');
const db = require('./config/mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// data parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// load server routes
app.use(require('./routes'));

db.once('open', () => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
        console.log(`🌍 Connected on localhost:${PORT}`);
    });
});
