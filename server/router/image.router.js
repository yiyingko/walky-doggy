const express = require("express");
const imageController = require("../controller/image.controller");
const imageRouter = express.Router();

imageRouter.get("/:eventId", imageController.getEventImages);
imageRouter.delete('/:id',imageController.deleteImage);
imageRouter.post("/", imageController.postImage);

module.exports = imageRouter;
