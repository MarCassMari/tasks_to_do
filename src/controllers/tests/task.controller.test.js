const TaskController = require("../task.controller.js");
const TaskModel = require("../../models/task.model.js");

jest.mock("../../models/task.model.js");

describe("TaskController", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("deve retornar todas as tarefas com sucesso", async () => {
        const mockTasks = [{ id: 1, description: "Tarefa 1" }];
        TaskModel.find.mockResolvedValue(mockTasks);

        const controller = new TaskController(req, res);
        await controller.getTasks();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockTasks);
    });

    it("deve retornar erro ao buscar tarefas", async () => {
        TaskModel.find.mockRejectedValue(new Error("Erro de conexão"));

        const controller = new TaskController(req, res);
        await controller.getTasks();

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
