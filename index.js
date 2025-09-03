const express = require("express");
const dotenv = require("dotenv");
const TaskRoutes = require("./src/routes/task.routes");
const cors = require("cors");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");
const e = require("express");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/tasks", TaskRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
