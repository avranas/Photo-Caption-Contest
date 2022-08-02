const express = require('express');
const bcrypt = require('bcrypt');
const registerRouter = express.Router();
const User = require('../db/models/Users.js')
const {checkNotAuthenticated} = require('../authentication-check.js');

registerRouter.post('/', checkNotAuthenticated, async (req, res) => {
   try {
      const username = req.body.username;
      const password = req.body.password;
      //First check to see if a user with that name already exists
      const result = await User.findOne({
         where: {username: username}
      });
      if(result){
         //How can I display this message to the user?
         throw "A user with that name already exists";
      }else{
         //This is how you use bcrypt to hash passwords
         //I played with the salt. 
         //1 completes the process in an instant.
         //10 gives a very slight delay
         //15 gives a noticable delay
         //20 took about a minute to complete
         const hashedPassword = await bcrypt.hash(password, 10);
         await User.create({
            username: username,
            password: hashedPassword
         });
         res.status(200).send(`Created new user: ${username}`);
         //Old deleted front end ->
         //res.redirect('/login');
      }
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
      //Old deleted front end ->
      //res.redirect('/register');
   }
});

module.exports = registerRouter;
