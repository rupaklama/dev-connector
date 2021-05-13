// common js module import syntax
const express = require('express');
const connectDB = require('./config/db');

// instance of express app object
const app = express();

// Connect Database
connectDB();

// NOTE - 'bodyParser' is part of node now to modify  either the 'request' or 'response'
// Anytime incoming requests occurs,this middleware parse the body & assigns the 'json data'
// to the req.body property before sending to the request handlers
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json('API Running'));

// Define Routes
// use method - to make use of routes or middleware
// require - importing route files
// '/api/users' - all these api end points will forwarded to the file routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// dynamic port binding in prod or dev environment
const PORT = process.env.PORT || 5000;

// app object's listen method
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
