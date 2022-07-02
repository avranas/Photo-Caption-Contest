const express = require('express');
const imageRouter = express.Router();
const Image = require('../db/Images')

//Get all images
imageRouter.get('/', async (req, res) => {
   try{
      const result = await Image.findAll();
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

//Get one image with ID
imageRouter.get('/:id', async (req, res) => {
   try{
      const result = await Image.findOne({
         where: {id: req.params.id}
      });
      res.status(200).send(result);
   }catch(err){
      console.log(err);
      res.status(400).send();
   }
});

module.exports = imageRouter;