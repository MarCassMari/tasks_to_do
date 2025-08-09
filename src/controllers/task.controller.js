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

    async deleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskExists = await TaskModel.findById(taskId);
            if (!taskExists) {
                return this.res
                    .status(404)
                    .send({ error: "Tarefa não encontrada!" });
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send();
        }
    }
}

module.exports = TaskController;
