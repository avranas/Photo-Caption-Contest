const express = require('express');
const captionRouter = express.Router();
const Caption = require('../db/models/Captions.js');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 10 });

//Get all captions
captionRouter.get('/', async (req, res) => {
   try{
      if(cache.has('allCaptions')){
         return res.send(cache.get('allCaptions'));

      } else {
         const result = await Caption.findAll();
         cache.set('allCaptions', result);
         res.status(200).send(result);
      }
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

captionRouter.post('/', async (req, res) => {
   try {
      const newCaption = req.body.new_caption;
      const imageID = req.body.image_id;
      const userID = req.user.id;
      await Caption.create({
         image_id: imageID,
         user_id: userID,
         caption: newCaption,
         time: Date.now()
      });
      res.redirect(`/images/${imageID}`);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }

});

//Add caption to an image with Postman
captionRouter.post('/:imageID/:userID', async (req, res) => {
   try{
      const text = req.body.text;
      const imageID = Number(req.params.imageID);
      const userID = Number(req.params.userID);
      await Caption.create({
         image_id: imageID,
         user_id: userID,
         caption: text,
         time: Date.now()
      });
      res.status(202).send(
         `Caption posted to image with ID#${imageID}. Caption: "${text}"`
      );
   }catch(err){
      console.log(err);
   }
});

module.exports = captionRouter;
