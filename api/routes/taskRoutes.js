module.exports = (app) => {

    var tasks = require('../controllers/taskController');

    // task routes

    /*
    * routes for /api/tasks
    * GET : gets all tasks in tasks collection
    * POST : creates a new task => Req.body requires name attribute
    *
    */
    app.route('/api/tasks')
        .get(tasks.listAllTasks)
        .post(tasks.createTask);

    /*
    * routes for /api/tasks/:taskId
    * GET : gets single task by its ID
    * PUT : updates a single task by its ID
    * DELETE : deletes a single task by its ID
    */    
    app.route('/api/tasks/:taskId')
        .get(tasks.readTask)
        .put(tasks.updateTask)
        .delete(tasks.deleteTask);

    /* 
    * routes for /api/tasks/status/:status
    * GET : gets tasks by their status (pending, ongoing, completed)
    *
    *
    */
    app.route('/api/tasks/status/:status')
        .get(tasks.listTasksByStatus);
};