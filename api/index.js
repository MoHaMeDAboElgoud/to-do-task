const toDoRoutes = require('./to-do/to-do.routes');
const usersRoutes = require('./user/user.routes');

const router = require('express').Router();




// router.use('/auth/', auth.routes);

router.use('/users/', /*asyncWrapper(middleware.authentication),*/ usersRoutes);
router.use('/to-do/', /*asyncWrapper(middleware.authentication),*/ toDoRoutes);




module.exports = { router };