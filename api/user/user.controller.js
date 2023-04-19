const { UnprocessableEntityError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const { User } = require("./user.model");
const UserProvider = require("./user.provider");
const bcrypt = require('bcrypt');
const GeneralUtils = require("../../utils/general");


class UserController {

  static async validateUser(name, password, email) {
    GeneralUtils.checkRequiredFieldExists(email) || GeneralUtils.UnprocessableEntityError(MESSAGES.EMAIL_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(name) || GeneralUtils.UnprocessableEntityError(MESSAGES.NAME_REQUIRED);
    GeneralUtils.checkRequiredFieldExists(password) || GeneralUtils.UnprocessableEntityError(MESSAGES.PASSWORD_REQUIRED);
    const [foundEmail, hashedPassword] = await Promise.all([
      UserProvider.findUser(User, { email }, '_id'),
      bcrypt.hash(password, 10)
    ]);
    if (foundEmail) {
      throw new UnprocessableEntityError(MESSAGES.DUPLICATED_EMAIL);
    }
    return {
      name,
      password: hashedPassword,
      email
    }
  }

  static async getUsers(filters = {}, projection = {}, options = {}) {
    return UserProvider.findUsers(User, filters, projection, options);
  }

  static async addUser(name, password, email) {
    const user = await UserController.validateUser(name, password, email);
    return UserProvider.createUser(User, user);
  }
}

module.exports = UserController;