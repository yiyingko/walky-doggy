const express = require("express");
const recordController = require("../controller/record.controller");
const recordRouter = express.Router();
const { check, validationResult } = require("express-validator");

recordRouter.get("/:eventId", recordController.getEventRecords);
recordRouter.delete('/:id',recordController.deleteRecord);
recordRouter.post("/", recordController.postRecord);

module.exports = recordRouter;
