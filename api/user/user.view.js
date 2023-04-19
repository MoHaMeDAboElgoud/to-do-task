const { ApiError } = require("../../utils/ApiError");
const UserController = require("./user.controller");


class UserView {
  static async getUsers(req, res) {
    try {
      const users = await UserController.getUsers();
      res.send(users);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  static async addUser(req, res) {
    try {
      const { name, password, email } = req.body;
      const user = await UserController.addUser(name, password, email);
      res.send({ userId: user._id });
    } catch (error) {
      throw new ApiError(error);
    }
  }
}

module.exports = UserView;