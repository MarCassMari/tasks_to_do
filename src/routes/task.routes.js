const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");
const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).newTask();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
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
