const { UnprocessableEntityError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");


class ToDoProvider {
  constructor(provider) {
    if (!provider) {
      throw new UnprocessableEntityError(MESSAGES.PROVIDER_REQUIRED);
    }
    this.provider = provider;
  }

  async findToDo(filters = {}, projection = {}, options = {}) {
    return this.provider.findOne(filters, projection, options);
  }

  async deleteToDo(filters) {
    return this.provider.deleteOne(filters);
  }

  async findToDos(filters = {}, projection = {}, options = {}) {
    return this.provider.find(filters, projection, options);
  }

  async createToDo(toDo) {
    const newToDo = new this.provider(toDo);
    return newToDo.save();
  }

  async updateToDo(toDoId, update) {
    return this.provider.updateOne({ _id: toDoId }, { $set: update });
  }
}

module.exports = ToDoProvider;