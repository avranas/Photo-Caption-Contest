const express = require("express");
const captionRouter = express.Router();
const Caption = require("../db/models/Captions");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 10 });
const { checkAuthenticated } = require("../authentication-check");

//Get all captions
captionRouter.get("/", async (req, res) => {
  try {
    if (cache.has("allCaptions")) {
      return res.send(cache.get("allCaptions"));
    } else {
      const result = await Caption.findAll();
      cache.set("allCaptions", result);
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
});

//Get one caption with ID
captionRouter.get("/:id", async (req, res) => {
  try {
    const result = await Caption.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
});

/*Post a new caption
Example:
POST localhost:3000/captions
Body (JSON):
{
    "new_caption": "Hello world",
    "image_id": 1
}
*/
captionRouter.post("/", checkAuthenticated, async (req, res) => {
  try {
    const newCaption = req.body.new_caption;
    const imageID = req.body.image_id;
    const userID = req.user.id;
    await Caption.create({
      image_id: imageID,
      user_id: userID,
      caption: newCaption,
      time: Date.now(),
    });
    res
      .status(201)
      .send(
        `User "${req.user.username}" posted caption "${newCaption}" to image#${imageID}.`
      );
    //Old deleted front end ->
    //res.redirect(`/images/${imageID}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = captionRouter;
