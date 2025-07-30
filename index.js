const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo ao meu servidor Express!");
});

app.get("/tasks", (req, res) => {
    const tasks = [
        { id: 1, title: "Estudar Node.js", completed: false },
        { id: 2, title: "Criar API", completed: false },
        { id: 3, title: "Testar API", completed: false },
        { id: 4, title: "Deploy da API", completed: false },
    ];
    res.status(200).send(tasks);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
