//create a Route(mini exp app)
const exp = require("express");
const userApp = exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");
const verifyToken=require('../Middlewares/verifyToken')

//import req handlers from Controller
const {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  removeUser,
  loginUser,
  getSensitiveData
} = require("../Controllers/user-controller");

//user CRUD

//read all users
userApp.get("/users", expressAsyncHandler(getUsers));
//read user by username
userApp.get("/user/:username", expressAsyncHandler(getUserByUsername));
//create user
userApp.post("/user", expressAsyncHandler(createUser));
//user login
userApp.post("/login", expressAsyncHandler(loginUser));
//update user
userApp.put("/user", expressAsyncHandler(updateUser));
//delete user by username
userApp.delete("/user/:username", expressAsyncHandler(removeUser));

//protectred route
userApp.get('/user-sensitive-data',verifyToken,expressAsyncHandler(getSensitiveData))

//export userApp
module.exports = userApp;
