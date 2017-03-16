var express = require('express');
var router = express.Router();
var usersRoute = require("./users/usersRoute");
var authenticateRoute = require("./authenticateRoute/authenticateRoute");

var userRoutes=function(app) {
    console.log("*********************user routes")
  app.get('/api/users/getExistedEmail', usersRoute.getExistedEmail);
  app.post('/api/users/addUser', usersRoute.createUserNew);
  app.put('/api/users/confirmUser', usersRoute.confirmUser);
  app.get('/api/user/authenticate', authenticateRoute.validateUser);
  app.get('/api/user/logout', authenticateRoute.logout);
  app.get('/api/users/forgotPassword', authenticateRoute.forgotPassword);
  app.put('/api/users/resetPassword', authenticateRoute.resetPassword);
  app.get('/api/user/profile', authenticateRoute.getProfile);
  app.post('/api/users/address/create', usersRoute.createAddress);
  app.get('/api/users/profile/address', authenticateRoute.getAddress);
  app.delete("/api/users/profile/deleteAddress", authenticateRoute.deleteAddress)

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');*/
};

module.exports = userRoutes;
