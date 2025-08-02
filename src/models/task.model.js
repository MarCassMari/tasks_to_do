const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
