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

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            if (!task) {
                return this.res.status(404).send({
                    error: "Tarefa não foi encontrada no banco de dados!",
                });
            }
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send();
        }
    }

    async updateTask() {
        try {
            const taskId = this.req.params.id;
            const updatedTask = await TaskModel.findById(taskId);
            const allowedUpdates = ["description"];
            const updates = Object.keys(this.req.body);

            for (const update of updates) {
                if (allowedUpdates.includes(update)) {
                    updatedTask[update] = this.req.body[update];
                } else {
                    return this.res.status(400).send({
                        error: "Atualização inválida! O campo editado não pode ser atualizado...",
                    });
                }
            }
            await updatedTask.save();
            this.res.status(200).send(updatedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
