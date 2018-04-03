module.exports = (app) => {

    var views = require('../controllers/viewsController');

    // task routes
    app.route('/tasksList').get(views.tasksList)
    //app.route('/newTask').get(views.newTask);
};