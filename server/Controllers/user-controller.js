const User = require("../Models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const getUsers = async (req, res) => {
  const usersList = await User.find();
  res.status(200).send({ message: "users", payload: usersList });
}

const getUserByUsername = async (req, res) => {
  let username = req.params.username;
  let user = await User.find({ username: username });
  if (user.length !== 0) {
    res.status(200).send({ message: 'user found', payload: user });
  } else {
    res.send({ message: 'user not found' });
  }
}

const createUser = async (req, res) => {
  let existingUser = await User.findOne({ username: req.body.username });
  if (existingUser !== null) {
    return res.status(200).send({ message: "User already existed" });
  }
  const hashedPassword = await bcryptjs.hash(req.body.password, 6);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);
  res.status(201).send({ message: "User created", payload: newUser });
}

const loginUser = async (req, res) => {
  const userCredentials = req.body;
  let user = await User.findOne({ username: userCredentials.username });
  if (user === null) {
    return res.status(200).send({ message: "Invalid username" });
  }
  const result = await bcryptjs.compare(
    userCredentials.password,
    user.password
  );
  if (result === false) {
    return res.status(200).send({ message: "Invalid password" });
  }
  const signedToken = jwt.sign(
    { username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
  res.status(200).send({ message: "login success", token: signedToken, user: user });
}

const updateUser = async (req, res) => {
  let user = await User.findOneAndUpdate(
    { username: req.body.username },
    { ...req.body }
  );
  if (user === null) {
    return res.send({ message: "User not found" });
  }
  res.status(200).send({ message: "User modified", payload: user });
}

const removeUser = async (req, res) => {
  let username = req.params.username;
  let deletedUser = await User.findOneAndDelete({ username: username });
  if (deletedUser === null) {
    return res.send({ message: "User not found" });
  }
  res.status(200).send({ message: 'User deleted', payload: deletedUser });
}

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  removeUser,
  loginUser
};