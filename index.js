const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

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
    const taskId = req.params.id;
    const taskExists = await TaskModel.findById(taskId);

    if (!taskExists) {
        return res.status(500).send({ error: "Tarefa não encontrada!" });
    }
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
