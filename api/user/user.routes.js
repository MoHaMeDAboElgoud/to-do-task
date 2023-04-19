const asyncWrapper = require('../../utils/asyncWrapper');
const UserView = require('./user.view');

const usersRoutes = require('express').Router();


usersRoutes.route('/')
  .get(asyncWrapper(UserView.getUsers))
  .post(asyncWrapper(UserView.addUser));

module.exports = usersRoutes;