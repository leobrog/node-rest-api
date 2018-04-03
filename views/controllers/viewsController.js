const mongoose = require('mongoose');

var Task = mongoose.model('Tasks');

exports.tasksList = (req, res) => {

    Task.find({}, (err, task) => {
        if (err) {
            console.log(err);
        } else {
            res.render('tasksList.hbs', {
                tasks: task
            })
        }
    })
}