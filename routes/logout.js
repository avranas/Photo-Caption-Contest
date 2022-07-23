const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res, next) => {
   req.logout( err =>{
      if(err){
         return next(err);
      }
   });
   res.redirect("/login");
});

module.exports = logoutRouter;
