const userController = require('./authenticateController.js');
const express = require('express');
const app = express.Router();
app.post("/signup", userController.signup);
app.post("/signin", userController.Signin);
app.get("/getallusers", userController.getallusers);
app.post("/deleteuser", userController.deleteuser);

module.exports = app;
