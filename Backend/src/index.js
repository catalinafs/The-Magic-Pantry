// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config
dotenv.config();
const { port } = require('./config');

// Routes
const authAPI = require('./router/auth');
const parameterAPI = require('./router/parameter');
const parameter_valuesAPI = require('./router/parameter_values');

// Constants
const app = express();

// App Use
app.use(bodyParser.json());

// App Routes
authAPI(app);
parameterAPI(app);
parameter_valuesAPI(app);

// Listening app
app.listen(port, () => {
    console.log('is working on port: ' + port);
});