const express = require("express");
const eventController = require("../controller/event.controller");
const eventRouter = express.Router();
const { check, validationResult } = require("express-validator");

eventRouter.get("/", eventController.getEvents);
eventRouter.get("/past/", eventController.getPastEvents);
eventRouter.delete('/:id',eventController.deleteEvent);


eventRouter.post(
  "/",
  [
    check("title").notEmpty().trim().withMessage("Event title cannot be empty"),
    check("date").notEmpty().isISO8601().withMessage("Incorrect date").toDate(),
    check("venue").notEmpty().trim().withMessage("Venue cannot be empty"),
  ],

  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(400).json({ error: error.array() });
    } else {
      next();
    }
  },

  eventController.postEvent
);

module.exports = eventRouter;
