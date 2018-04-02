module.exports = (app) => {

    var tasks = require('../controllers/taskController');

    // task routes

    app.route('/tasks')
        .get(tasks.listAllTasks)
        .post(tasks.createTask);

    app.route('/tasks/:taskId')
        .get(tasks.readTask)
        .put(tasks.updateTask)
        .delete(tasks.deleteTask);
};