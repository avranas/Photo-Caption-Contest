const express = require("express");
const userRouter = express.Router();
const User = require("../db/models/Users.js");
const {
  checkAdminAuthenticated,
  checkAuthenticated,
} = require("../authentication-check");

const getUserData = async (username) => {
  const foundUser = await User.findOne({
    where: { username: username },
  });
  if (!foundUser) {
    throw createHttpError(400, "No user with that name was found");
  }
  //Copy the json data of the db response then hide the password
  let copy = JSON.parse(JSON.stringify(foundUser));
  delete copy["password"];
  return copy;
};

userRouter.get("/current", checkAuthenticated, async (req, res, next) => {
  try {
    const userData = await getUserData(req.user.username);
    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
});

//Get all users. Only admins can see this
userRouter.get("/", checkAdminAuthenticated, async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

//Get one user with ID. Only admins can see this
userRouter.get("/:id", checkAdminAuthenticated, async (req, res) => {
  try {
    const result = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

module.exports = userRouter;
