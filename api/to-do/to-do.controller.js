const { isValidObjectId } = require("mongoose");
const { UnprocessableEntityError } = require("../../utils/ApiError");
const GeneralUtils = require("../../utils/general");
const MESSAGES = require("../../utils/messages");
const { User } = require("../user/user.model");
const UserProvider = require("../user/user.provider");
const { ToDo } = require("./to-do.model");
const ToDoProvider = require("./to-do.provider");


class ToDoController {
  static async getToDos(userId) {
    const filters = {};
    if (userId) {
      isValidObjectId(userId) || GeneralUtils.UnprocessableEntityError(MESSAGES.MONGO_ID);
      await ToDoController.checkIsValidUser(userId);
      filters.userId = userId;
    }
    const toDoProvider = new ToDoProvider(ToDo);
    return toDoProvider.findToDos(filters);
  }

  static async getToDo(toDoId, userId) {
    GeneralUtils.checkRequiredFieldExists(toDoId) || GeneralUtils.UnprocessableEntityError(MESSAGES.TO_DO_ID_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(userId) || GeneralUtils.UnprocessableEntityError(MESSAGES.USER_ID_REQUIRED);
    (isValidObjectId(toDoId) && isValidObjectId(userId)) || GeneralUtils.UnprocessableEntityError(MESSAGES.MONGO_ID);
    await ToDoController.checkIsValidUser(userId);
    const toDoProvider = new ToDoProvider(ToDo);
    return toDoProvider.findToDo({
      _id: toDoId,
      userId
    });
  }

  static async deleteToDoTask(toDoId) {
    GeneralUtils.checkRequiredFieldExists(toDoId) || GeneralUtils.UnprocessableEntityError(MESSAGES.TO_DO_ID_REQUIRED);
    isValidObjectId(toDoId) || GeneralUtils.UnprocessableEntityError(MESSAGES.MONGO_ID);
    const toDoProvider = new ToDoProvider(ToDo);
    const toDoTask = await toDoProvider.findToDo({
      _id: toDoId
    });
    if (!toDoTask) {
      throw new UnprocessableEntityError(MESSAGES.NOT_FOUND_TODO);
    }
    return toDoProvider.deleteToDo({
      _id: toDoId
    });
  }

  static async checkIsValidUser(userId) {
    const userData = await UserProvider.findUser(User, { _id: userId }, '_id');
    if (!userData) {
      throw new UnprocessableEntityError(MESSAGES.NOT_FOUND_USER);
    }
    return userData;
  }

  static async addToDo(userId, content, isCompleted, dateTime) {
    GeneralUtils.checkRequiredFieldExists(userId) || GeneralUtils.UnprocessableEntityError(MESSAGES.USER_ID_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(content) || GeneralUtils.UnprocessableEntityError(MESSAGES.CONTENT_REQUIRED);
    isValidObjectId(userId) || GeneralUtils.UnprocessableEntityError(MESSAGES.MONGO_ID);
    if (dateTime && new Date(dateTime).toString() === 'Invalid Date') {
      GeneralUtils.UnprocessableEntityError(MESSAGES.NOT_VALID_DATE_TIME);
    }
    await ToDoController.checkIsValidUser(userId);
    const toDoProvider = new ToDoProvider(ToDo);
    return toDoProvider.createToDo({
      userId,
      content,
      is_completed: Boolean(isCompleted),
      dateTime: dateTime ? dateTime : null
    });
  }

  static async editToDo(toDoId, userId, content, isCompleted, dateTime) {
    GeneralUtils.checkRequiredFieldExists(toDoId) || GeneralUtils.UnprocessableEntityError(MESSAGES.TO_DO_ID_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(userId) || GeneralUtils.UnprocessableEntityError(MESSAGES.USER_ID_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(content) || GeneralUtils.UnprocessableEntityError(MESSAGES.CONTENT_REQUIRED);
    (isValidObjectId(toDoId) && isValidObjectId(userId)) || GeneralUtils.UnprocessableEntityError(MESSAGES.MONGO_ID);
    if (dateTime && new Date(dateTime).toString() === 'Invalid Date') {
      GeneralUtils.UnprocessableEntityError(MESSAGES.NOT_VALID_DATE_TIME);
    }
    await ToDoController.checkIsValidUser(userId);
    const toDoProvider = new ToDoProvider(ToDo);
    const toDoTask = await toDoProvider.findToDo({ _id: toDoId });
    if (!toDoTask) {
      throw new UnprocessableEntityError(MESSAGES.NOT_FOUND_TODO);
    }
    /**
     * @todo Log data before editing && get signature
     */
    return toDoProvider.updateToDo(toDoId, {
      content,
      is_completed: Boolean(isCompleted),
      dateTime: dateTime ? dateTime : null
    });
  }
}

module.exports = ToDoController;