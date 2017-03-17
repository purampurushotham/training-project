var express = require('express');
var router = express.Router();
var usersRoute = require("./users/usersRoute");
var authenticateRoute = require("./authenticateRoute/authenticateRoute");

var userRoutes=function(app) {
  app.get('/api/v1.0/users/getExistedEmail', usersRoute.getExistedEmail);
  app.post('/api/v1.0/users/addUser', usersRoute.createUserNew);
  app.put('/api/v1.0/users/confirmUser', usersRoute.confirmUser);
  app.get('/api/v1.0/user/authenticate', authenticateRoute.validateUser);
  app.get('/api/v1.0/user/logout', authenticateRoute.logout);
  app.get('/api/v1.0/users/forgotPassword', authenticateRoute.forgotPassword);
  app.put('/api/v1.0/users/resetPassword', authenticateRoute.resetPassword);
  app.get('/api/v1.0/user/profile', authenticateRoute.getProfile);
  app.post('/api/v1.0/users/address/create', usersRoute.createAddress);
  app.get('/api/v1.0/users/profile/address', authenticateRoute.getAddress);
  app.delete("/api/v1.0/users/profile/deleteAddress", authenticateRoute.deleteAddress)
};

module.exports = userRoutes;
