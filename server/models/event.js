const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
  title : String,
  date: Date,
  venue: String
});

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;


