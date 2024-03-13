const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");

const {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  removeUser,
  loginUser
} = require("../Controllers/user-controller");

userApp.get("/users", expressAsyncHandler(getUsers));

userApp.get("/user/:username", expressAsyncHandler(getUserByUsername));

userApp.post("/user", expressAsyncHandler(createUser));

userApp.post("/login", expressAsyncHandler(loginUser));

userApp.put("/user", expressAsyncHandler(updateUser));

userApp.delete("/user/:username", expressAsyncHandler(removeUser));

module.exports = userApp;