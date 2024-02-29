// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config
dotenv.config();
const { port } = require('./config');

// Routes

// Constants
const app = express();

// App Use
app.use(bodyParser.json());

// App Routes

// Listening app
app.listen(port, () => {
    console.log('is working on port: ' + port);
});