const TaskModel = require("../models/task.model.js");
const { notFoundError } = require("../errors/mongodb.errors.js");
const {
    internalServerError,
    badRequestError,
} = require("../errors/general.errors.js");

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
            return internalServerError(
                this.res,
                "Erro ao buscar tarefas! Verifique a conexão com o banco de dados."
            );
        }
    }

    async newTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            return badRequestError(
                this.res,
                "Erro ao criar nova tarefa! Verifique os dados enviados."
            );
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskExists = await TaskModel.findById(taskId);
            if (!taskExists) {
                return notFoundError(
                    this.res,
                    "Tarefa não encontrada nos registros!"
                );
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            return internalServerError(this.res, "Erro ao deletar tarefa!");
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            if (!task) {
                return notFoundError(
                    this.res,
                    "Tarefa não encontrada nos registros!"
                );
            }
            return this.res.status(200).send(task);
        } catch (error) {
            return internalServerError(
                this.res,
                "Erro ao buscar tarefa pelo ID!"
            );
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
                    return notFoundError(
                        this.res,
                        "Campo não permitido para atualização!"
                    );
                }
            }
            await updatedTask.save();
            this.res.status(200).send(updatedTask);
        } catch (error) {
            return internalServerError(this.res, "Erro ao atualizar tarefa!");
        }
    }
}

module.exports = TaskController;
