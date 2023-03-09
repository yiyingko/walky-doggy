const express = require("express");
const locationController = require("../controller/location.controller");
const locationRouter = express.Router();


locationRouter.get("/:eventId", locationController.getEventLocations);
locationRouter.post("/", locationController.postLocation);

module.exports = locationRouter;