const asyncWrapper = require('../../utils/asyncWrapper');
const ToDoView = require('./to-do.view');

const toDoRoutes = require('express').Router();


toDoRoutes.route('/')
  .get(asyncWrapper(ToDoView.getToDoTasks))
  .post(asyncWrapper(ToDoView.addToDo));

toDoRoutes.route('/:toDoId')
  .get(asyncWrapper(ToDoView.getToDoTask))
  .delete(asyncWrapper(ToDoView.deleteToDoTask))
  .put(asyncWrapper(ToDoView.updateToDoTask));

module.exports = toDoRoutes;