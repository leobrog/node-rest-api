const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const hbs = require('hbs');

// Use either the host environment port or hardcoded 3000 port.
const port = process.env.PORT || 3000;

var app = express();

// Setting up views engine (currently not being used)
//hbs.registerPartials(__dirname + '/views/partials');
//app.set('view engine', 'hbs');

// Server's request Logger middleware. Log available at server.log.
app.use( require('./utilities/server-logger/serverLogger').requestLogger);

// hbs.registerHelper('getCurrentYear', () => {
//     return new Date().getFullYear();
// });

// Importing Tasks mongoose model.
var Task = require('./api/models/taskModel');

// Database connection URI's. Use localhost when connection to remote DBserver is not available.

// Localhost connection URI
//var db = 'mongodb://localhost:27017'; 

// mLab URI: mongodb://<dbuser>:<dbpassword>@ds059207.mlab.com:59207/node-rest-api-tasks
var db = 'mongodb://leob:123456@ds059207.mlab.com:59207/node-rest-api-tasks'

//MongoDB connection promise
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if (err) {
        console.log('Could not connect to MongoDB');
    } else {
        console.log('Connected to DB server.');
    }
});

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Registering Tasks API Routes. See @ api/routes/taskRoutes
var taskRoutes = require('./api/routes/taskRoutes');
taskRoutes(app);

// Static Page rendering Routes
//var viewsRoutes = require('./views/routes/viewsRoutes');
//viewsRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});