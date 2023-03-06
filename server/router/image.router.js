const express = require("express");
const imageController = require("../controller/image.controller");
const imageRouter = express.Router();
const { check, validationResult } = require("express-validator");

imageRouter.get("/:eventId", imageController.getEventImages);
imageRouter.delete('/:id',imageController.deleteImage);
imageRouter.post("/", imageController.postImage);

module.exports = imageRouter;
