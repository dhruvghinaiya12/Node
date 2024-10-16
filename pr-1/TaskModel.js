const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName:  String,
    description:  String, 
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
