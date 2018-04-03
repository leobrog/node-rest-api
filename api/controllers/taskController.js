const mongoose = require('mongoose');

var Task = mongoose.model('Tasks');

exports.listAllTasks = (req, res) => {

    Task.find({}, (err, task) => {
        
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

exports.listTasksByStatus = (req, res) => {

    Task.find({status : [ req.params.status ]}, (err, task) => {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

exports.createTask = (req, res) => {

    var newTask = new Task(req.body);

    newTask.save((err, task) => {
        
        if (err){
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

exports.readTask = (req, res) => {

    Task.findById(req.params.taskId, (err, task) => {

        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
};

exports.updateTask = (req, res) => {

    if( req.body.status === 'pending' || req.body.status === 'ongoing' || req.body.status === 'completed'){
        Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task) => {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    } else {
        res.json({message : "Status must be pending, ongoing or completed."});
    }
}

exports.deleteTask = (req, res) => {

    Task.remove({
        _id: req.params.taskId
    }, (err, task) => {

        if (err) {
            res.send(err);
        } else {
            res.json({message : 'Task removed successfully.'});
        }
    });
};