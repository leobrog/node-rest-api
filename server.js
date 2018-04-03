const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Server request Log middleware.
app.use( require('./utilities/server-logger/serverLogger').requestLogger);

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

var Task = require('./api/models/taskModel');

var db = 'mongodb://localhost:27017'; // mLab URI: mongodb://<dbuser>:<dbpassword>@ds059207.mlab.com:59207/node-rest-api-tasks
//var db = 'mongodb://leob:123456@ds059207.mlab.com:59207/node-rest-api-tasks'

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

// Tasks API Routes
var taskRoutes = require('./api/routes/taskRoutes');
taskRoutes(app);

// Static Page rendering Routes
//var viewsRoutes = require('./views/routes/viewsRoutes');
//viewsRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});