const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");
const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(
            { error: "Erro ao criar tarefa!!" },
            error.message
        );
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskExists = await TaskModel.findById(taskId);
        if (!taskExists) {
            return res.status(404).send({ error: "Tarefa não encontrada!" });
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).send({
                error: "Tarefa não foi encontrada no banco de dados!",
            });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const updatedTask = await TaskModel.findById(taskId);
        const allowedUpdates = ["description"];
        const updates = Object.keys(req.body);

        for (const update of updates) {
            if (allowedUpdates.includes(update)) {
                updatedTask[update] = req.body[update];
            } else {
                return res.status(400).send({
                    error: "Atualização inválida! O campo editado não pode ser atualizado...",
                });
            }
        }
        await updatedTask.save();
        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
