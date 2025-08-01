const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();

connectToDatabase();
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo ao meu servidor Express!");
});

app.get("/tasks", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
