const { ApiError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const ToDoController = require("./to-do.controller");

class ToDoView {
  static async getToDoTasks(req, res) {
    try {
      const toDos = await ToDoController.getToDos();
      res.send(toDos);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  static async getToDoTask(req, res) {
    try {
      const { toDoId } = req.params;
      const { userId } = req.query;
      const toDos = await ToDoController.getToDo(toDoId, userId);
      res.send(toDos);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  static async deleteToDoTask(req, res) {
    try {
      const { toDoId } = req.params;
      const { userId } = req.query;
      const toDos = await ToDoController.deleteToDoTask(toDoId, userId);
      res.send({ message: MESSAGES.DELETED });
    } catch (error) {
      throw new ApiError(error);
    }
  }

  static async addToDo(req, res) {
    try {
      const { userId, content, isCompleted, dateTime } = req.body;
      const toDo = await ToDoController.addToDo(userId, content, isCompleted, dateTime);
      res.send({ toDoId: toDo._id });
    } catch (error) {
      throw new ApiError(error);
    }
  }

  static async updateToDoTask(req, res) {
    try {
      const { toDoId } = req.params;
      const { userId, content, isCompleted, dateTime } = req.body;
      await ToDoController.editToDo(toDoId, userId, content, isCompleted, dateTime);
      res.send({ toDoId });
    } catch (error) {
      throw new ApiError(error);
    }
  }
}

module.exports = ToDoView;