const express = require('express');
const userRouter = express.Router();
const User = require('../db/models/Users.js')
const {checkAdminAuthenticated} = require('../authentication-check');

//Get all users. Only admins can see this
userRouter.get('/', checkAdminAuthenticated, async (req, res) => {
   try{
      const result = await User.findAll();
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

//Get one user with ID. Only admins can see this
userRouter.get('/:id', checkAdminAuthenticated, async (req, res) => {
   try{
      const result = await User.findOne({
         where: {id: req.params.id}
      });
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

module.exports = userRouter;