const TaskModel = require("../models/task.model.js");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    getTasks() {
        try {
            const tasks = TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send({
                error: "Erro ao buscar tarefas!!",
                message: error.message,
            });
        }
    }
}
module.exports = TaskController;
