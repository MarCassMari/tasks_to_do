const express = require("express");

const TaskController = require("../controllers/task.controller");

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
    return new TaskController(req, res).updateTask();
});

module.exports = router;
