const express = require('express');
const Caption = require('../db/models/Captions.js');
const imageRouter = express.Router();
const Image = require('../db/models/Images.js');
const User = require('../db/models/Users.js');

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

//Get one image location with id
//Also returns all the captions for this image
imageRouter.get('/:id', async (req, res) => {
   try{
      const imageResult = await Image.findOne({
         where: {id: req.params.id}
      });
      const captionsResult = await Caption.findAll({
         where: {image_id: req.params.id},
         include: [{
           model: User,
           required: true
          }],
         order: [
            ['time', 'DESC']
        ],
      });
      if(imageResult){
         const sendThis = [];
         captionsResult.forEach(e => {
            const newEntry = {};
            newEntry.user = e.user.username;
            newEntry.caption = e.caption;
            sendThis.push(newEntry);
         });
         res.status(200).send(
         {
            imageLocation: `/images/${imageResult.image_location}`,
            captions: sendThis
         });
      } else {
         res.status(400).send("Unable to find image. Image ID might not exist");
      }
      /*
      Old deleted front end ->
      res.render('view-image.ejs', {
         username: req.user.username,
         imageLocation: `/images/${imageResult.image_location}`,
         captions: sendThis,
         image_id: req.params.id
      });
      */
   }catch(err){
      console.log(err);
      res.status(400).send(err);
   }
});

module.exports = imageRouter;
