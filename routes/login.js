const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();

loginRouter.post('/', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login'
}));

module.exports = loginRouter;
