const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");
const e = require("express");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo ao meu servidor Express!");
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(
            { error: "Erro ao buscar tarefas!!" },
            error.message
        );
    }
});

app.post("/tasks", async (req, res) => {
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

app.delete("/tasks/:id", async (req, res) => {
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

app.get("/tasks/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, taskData);
        return res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
