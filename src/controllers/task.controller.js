const TaskModel = require("../models/task.model.js");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send({
                error: "Erro ao buscar tarefas!!",
                message: error.message,
            });
        }
    }

    async newTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res
                .status(500)
                .send({ error: "Erro ao criar tarefa!!" }, error.message);
            console.log(error);
        }
    }
}
module.exports = TaskController;
