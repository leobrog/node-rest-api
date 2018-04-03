module.exports = (app) => {

    var tasks = require('../controllers/taskController');

    // task routes

    app.route('/api/tasks')
        .get(tasks.listAllTasks)
        .post(tasks.createTask);

    app.route('/api/tasks/:taskId')
        .get(tasks.readTask)
        .put(tasks.updateTask)
        .delete(tasks.deleteTask);
};