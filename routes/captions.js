const express = require('express');
const captionRouter = express.Router();
const Caption = require('../db/Captions');

//Get all captions
captionRouter.get('/', async (req, res) => {
   try{
      const result = await Caption.findAll();
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

//Get one caption with ID
captionRouter.get('/:id', async (req, res) => {
   try{
      const result = await Caption.findOne({
         where: {id: req.params.id}
      });
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

module.exports = captionRouter;