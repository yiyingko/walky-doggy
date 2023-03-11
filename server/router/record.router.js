const express = require("express");
const recordController = require("../controller/record.controller");
const recordRouter = express.Router();

recordRouter.get("/:eventId", recordController.getEventRecords);
recordRouter.delete('/:id',recordController.deleteRecord);
recordRouter.post("/", recordController.postRecord);

module.exports = recordRouter;
