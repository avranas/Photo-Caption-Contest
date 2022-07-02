const express = require('express');
const userRouter = express.Router();
const User = require('../db/User')

//Get all users
userRouter.get('/', async (req, res) => {
   try{
      const result = await User.findAll();
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

//Get one user with ID
userRouter.get('/:id', async (req, res) => {
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