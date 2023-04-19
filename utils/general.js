const { UnprocessableEntityError } = require("./ApiError");

class GeneralUtils {
  static UnprocessableEntityError(message = undefined) {
    throw new UnprocessableEntityError(message);
  }

  static checkRequiredFieldExists(field) {
    if (!field) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = GeneralUtils;